-- ============================================================
-- Migration 003: Functions & Triggers
-- Website Báo - PostgreSQL Database
-- ============================================================

-- ============================================================
-- Function: auto update "updatedAt" timestamp
-- ============================================================
CREATE OR REPLACE FUNCTION fn_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to users
DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();

-- Apply trigger to articles
DROP TRIGGER IF EXISTS trg_articles_updated_at ON articles;
CREATE TRIGGER trg_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();

-- Apply trigger to comments
DROP TRIGGER IF EXISTS trg_comments_updated_at ON comments;
CREATE TRIGGER trg_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();

-- ============================================================
-- Function: auto generate article slug
-- ============================================================
CREATE OR REPLACE FUNCTION fn_generate_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
BEGIN
  -- Chuyển về lowercase và thay thế dấu cách bằng gạch ngang
  slug := lower(trim(title));
  slug := regexp_replace(slug, '[àáạảãâầấậẩẫăằắặẳẵ]', 'a', 'g');
  slug := regexp_replace(slug, '[èéẹẻẽêềếệểễ]', 'e', 'g');
  slug := regexp_replace(slug, '[ìíịỉĩ]', 'i', 'g');
  slug := regexp_replace(slug, '[òóọỏõôồốộổỗơờớợởỡ]', 'o', 'g');
  slug := regexp_replace(slug, '[ùúụủũưừứựửữ]', 'u', 'g');
  slug := regexp_replace(slug, '[ỳýỵỷỹ]', 'y', 'g');
  slug := regexp_replace(slug, '[đ]', 'd', 'g');
  slug := regexp_replace(slug, '[^a-z0-9\s-]', '', 'g');
  slug := regexp_replace(slug, '\s+', '-', 'g');
  slug := regexp_replace(slug, '-+', '-', 'g');
  slug := trim(slug, '-');
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Function: auto update article search_vector (Full-text search)
-- ============================================================
CREATE OR REPLACE FUNCTION fn_update_article_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.excerpt, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(NEW.category, '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(NEW.tags, ' '), '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(NEW.content, '')), 'D');

  -- Auto generate slug if not set
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := fn_generate_slug(NEW.title) || '-' || substr(gen_random_uuid()::text, 1, 8);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_articles_search_vector ON articles;
CREATE TRIGGER trg_articles_search_vector
  BEFORE INSERT OR UPDATE OF title, excerpt, content, category, tags ON articles
  FOR EACH ROW EXECUTE FUNCTION fn_update_article_search_vector();

-- ============================================================
-- Function: auto update category article count
-- ============================================================
CREATE OR REPLACE FUNCTION fn_update_category_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update count for old category (on UPDATE or DELETE)
  IF TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN
    UPDATE categories
    SET "articleCount" = (
      SELECT COUNT(*) FROM articles
      WHERE category = OLD.category AND status = 'published'
    )
    WHERE slug = OLD.category;
  END IF;

  -- Update count for new category (on INSERT or UPDATE)
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE categories
    SET "articleCount" = (
      SELECT COUNT(*) FROM articles
      WHERE category = NEW.category AND status = 'published'
    )
    WHERE slug = NEW.category;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_articles_category_count ON articles;
CREATE TRIGGER trg_articles_category_count
  AFTER INSERT OR UPDATE OF status, category OR DELETE ON articles
  FOR EACH ROW EXECUTE FUNCTION fn_update_category_count();

-- ============================================================
-- Function: auto update tag article count
-- ============================================================
CREATE OR REPLACE FUNCTION fn_update_tag_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE tags SET "articleCount" = "articleCount" - 1
    WHERE id = OLD.tag_id AND "articleCount" > 0;
    RETURN OLD;
  ELSIF TG_OP = 'INSERT' THEN
    UPDATE tags SET "articleCount" = "articleCount" + 1
    WHERE id = NEW.tag_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_article_tags_count ON article_tags;
CREATE TRIGGER trg_article_tags_count
  AFTER INSERT OR DELETE ON article_tags
  FOR EACH ROW EXECUTE FUNCTION fn_update_tag_count();

-- ============================================================
-- Function: update editor stats after article review
-- ============================================================
CREATE OR REPLACE FUNCTION fn_update_editor_stats()
RETURNS TRIGGER AS $$
DECLARE
  v_editor_id UUID;
  v_reviewed  INTEGER;
  v_approved  INTEGER;
  v_rejected  INTEGER;
BEGIN
  -- Chỉ xử lý khi status thay đổi sang approved hoặc rejected
  IF NEW.status NOT IN ('approved', 'rejected', 'published') THEN
    RETURN NEW;
  END IF;
  IF OLD.status = NEW.status THEN
    RETURN NEW;
  END IF;

  v_editor_id := NEW.editor_id;
  IF v_editor_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Ensure editor_stats row exists
  INSERT INTO editor_stats (editor_id) VALUES (v_editor_id)
  ON CONFLICT (editor_id) DO NOTHING;

  -- Recalculate stats
  SELECT
    COUNT(*) FILTER (WHERE status IN ('approved', 'rejected', 'published')),
    COUNT(*) FILTER (WHERE status IN ('approved', 'published')),
    COUNT(*) FILTER (WHERE status = 'rejected')
  INTO v_reviewed, v_approved, v_rejected
  FROM articles
  WHERE editor_id = v_editor_id;

  UPDATE editor_stats SET
    "articlesReviewed" = v_reviewed,
    "articlesApproved" = v_approved,
    "articlesRejected" = v_rejected,
    "approvalRate"     = CASE WHEN v_reviewed > 0 THEN ROUND((v_approved::REAL / v_reviewed) * 100, 2) ELSE 0 END,
    "updatedAt"        = NOW()
  WHERE editor_id = v_editor_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_articles_editor_stats ON articles;
CREATE TRIGGER trg_articles_editor_stats
  AFTER UPDATE OF status ON articles
  FOR EACH ROW EXECUTE FUNCTION fn_update_editor_stats();

-- ============================================================
-- View: published articles with author info (tiện cho query)
-- ============================================================
CREATE OR REPLACE VIEW v_published_articles AS
  SELECT
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.category,
    a.image,
    a."readTime",
    a.views,
    a.likes,
    a.tags,
    a."isFeatured",
    a."publishedAt",
    a."createdAt",
    u.id            AS "authorId",
    u."fullName"    AS "authorName",
    u.avatar        AS "authorAvatar",
    e."fullName"    AS "editorName",
    cat.name        AS "categoryName",
    cat.color       AS "categoryColor",
    cat.icon        AS "categoryIcon"
  FROM articles a
  LEFT JOIN users u   ON a.author_id  = u.id
  LEFT JOIN users e   ON a.editor_id  = e.id
  LEFT JOIN categories cat ON a.category = cat.slug
  WHERE a.status = 'published';

-- ============================================================
-- View: article stats summary (for admin dashboard)
-- ============================================================
CREATE OR REPLACE VIEW v_article_stats AS
  SELECT
    status,
    COUNT(*)         AS total,
    SUM(views)       AS total_views,
    AVG(views)       AS avg_views,
    SUM(likes)       AS total_likes
  FROM articles
  GROUP BY status;
