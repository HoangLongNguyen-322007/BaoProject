-- ============================================================
-- Migration 006: Add source_url to articles for crawler
-- ============================================================

ALTER TABLE articles ADD COLUMN source_url TEXT UNIQUE;
