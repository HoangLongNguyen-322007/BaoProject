import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';

const mockArticle = {
   id: 1,
   title: 'Test Article',
   excerpt: 'Test excerpt',
   category: 'technology',
   author: 'Test Author',
   date: new Date('2026-05-30'),
   image: 'https://example.com/image.jpg',
   readTime: 5,
};

test('renders article card with title', () => {
   render(
      <BrowserRouter>
         <ArticleCard article={mockArticle} />
      </BrowserRouter>
   );

   expect(screen.getByText('Test Article')).toBeInTheDocument();
});

test('renders article excerpt', () => {
   render(
      <BrowserRouter>
         <ArticleCard article={mockArticle} />
      </BrowserRouter>
   );

   expect(screen.getByText('Test excerpt')).toBeInTheDocument();
});

test('renders article author', () => {
   render(
      <BrowserRouter>
         <ArticleCard article={mockArticle} />
      </BrowserRouter>
   );

   expect(screen.getByText(/Test Author/)).toBeInTheDocument();
});

test('renders read time', () => {
   render(
      <BrowserRouter>
         <ArticleCard article={mockArticle} />
      </BrowserRouter>
   );

   expect(screen.getByText(/5 min read/)).toBeInTheDocument();
});

test('has link to article detail page', () => {
   render(
      <BrowserRouter>
         <ArticleCard article={mockArticle} />
      </BrowserRouter>
   );

   const link = screen.getByRole('link', { name: 'Test Article' });
   expect(link).toHaveAttribute('href', '/article/1');
});
