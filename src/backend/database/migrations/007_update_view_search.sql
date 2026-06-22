-- ============================================================
-- Migration 007: Update v_published_articles with search_vector
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
    cat.icon        AS "categoryIcon",
    a.search_vector
  FROM articles a
  LEFT JOIN users u   ON a.author_id  = u.id
  LEFT JOIN users e   ON a.editor_id  = e.id
  LEFT JOIN categories cat ON a.category = cat.slug
  WHERE a.status = 'published';
