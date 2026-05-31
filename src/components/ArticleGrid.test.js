import { render, screen } from '@testing-library/react';
import ArticleGrid from '../components/ArticleGrid';

const mockArticles = [
   {
      id: 1,
      title: 'Article 1',
      excerpt: 'Excerpt 1',
      category: 'politics',
      author: 'Author 1',
      date: new Date('2026-05-30'),
      image: 'https://example.com/image1.jpg',
      readTime: 5,
   },
   {
      id: 2,
      title: 'Article 2',
      excerpt: 'Excerpt 2',
      category: 'technology',
      author: 'Author 2',
      date: new Date('2026-05-29'),
      image: 'https://example.com/image2.jpg',
      readTime: 4,
   },
];

test('renders grid with multiple articles', () => {
   render(<ArticleGrid articles={mockArticles} />);

   expect(screen.getByText('Article 1')).toBeInTheDocument();
   expect(screen.getByText('Article 2')).toBeInTheDocument();
});

test('renders loading state', () => {
   render(<ArticleGrid articles={[]} isLoading={true} />);

   expect(screen.getByText(/Loading articles/)).toBeInTheDocument();
});

test('renders empty state when no articles', () => {
   render(<ArticleGrid articles={[]} isLoading={false} />);

   expect(screen.getByText(/No articles found/)).toBeInTheDocument();
});

test('renders error state', () => {
   render(<ArticleGrid articles={[]} error="Failed to load articles" />);

   expect(screen.getByText(/Error loading articles/)).toBeInTheDocument();
   expect(screen.getByText(/Failed to load articles/)).toBeInTheDocument();
});
