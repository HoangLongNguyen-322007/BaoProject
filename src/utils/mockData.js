// Mock data for development - replace with API calls in Phase 2
export const CATEGORIES = [
   { id: 'politics', name: 'Politics', color: '#3b82f6' },
   { id: 'business', name: 'Business', color: '#10b981' },
   { id: 'technology', name: 'Technology', color: '#f59e0b' },
   { id: 'sports', name: 'Sports', color: '#ef4444' },
   { id: 'entertainment', name: 'Entertainment', color: '#8b5cf6' },
   { id: 'health', name: 'Health', color: '#06b6d4' },
   { id: 'lifestyle', name: 'Lifestyle', color: '#ec4899' },
];

export const MOCK_ARTICLES = [
   {
      id: 1,
      title: 'Breaking: New Policy Announced',
      excerpt: 'Government unveils comprehensive economic reform package aimed at boosting growth and creating jobs.',
      category: 'politics',
      author: 'John Smith',
      date: new Date('2026-05-30'),
      content: `Government unveils comprehensive economic reform package aimed at boosting growth and creating jobs. The new policy includes tax incentives for startups, investment in infrastructure, and support for green energy initiatives.

The reform is expected to create an estimated 50,000 new jobs over the next two years. Industry leaders have largely praised the initiative, though some economists raise concerns about long-term sustainability.

Key highlights of the policy include:
- Tax credits for companies investing in green technology
- $5 billion allocated to infrastructure development
- Support programs for small and medium enterprises
- Workforce development initiatives in tech and renewable energy sectors`,
      featured: true,
      image: 'https://images.unsplash.com/photo-1554224314-5fefe8c9ef14?w=800',
      readTime: 5,
   },
   {
      id: 2,
      title: 'Tech Giant Launches Revolutionary AI Platform',
      excerpt:
         'New artificial intelligence system promises to transform enterprise software with advanced capabilities.',
      category: 'technology',
      author: 'Sarah Johnson',
      date: new Date('2026-05-29'),
      content: `Leading technology company unveiled its latest artificial intelligence platform designed to revolutionize enterprise software. The new system uses advanced machine learning algorithms to automate complex business processes.

The platform is currently in beta testing with select enterprise customers. Early results show a 40% improvement in operational efficiency and 30% cost reduction in software infrastructure.`,
      featured: true,
      image: 'https://images.unsplash.com/photo-1677442d019cecf3d4f3f84cd23eb5e5?w=800',
      readTime: 4,
   },
   {
      id: 3,
      title: 'Sports Championship: Team Claims Victory',
      excerpt: 'National championship concluded with an exciting final match, crowning new champions.',
      category: 'sports',
      author: 'Mike Chen',
      date: new Date('2026-05-28'),
      content: `In an electrifying finale, the national championship saw a thrilling victory. The winning team demonstrated exceptional skill and teamwork throughout the tournament.

The championship match attracted record viewership, with over 10 million viewers tuning in to watch the historic event.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      readTime: 3,
   },
   {
      id: 4,
      title: 'Market Report: Strong Q2 Results',
      excerpt: 'Financial markets show positive momentum as major indices close with significant gains.',
      category: 'business',
      author: 'Emily Davis',
      date: new Date('2026-05-27'),
      content: `Financial markets demonstrated strength in the second quarter, with major indices posting solid gains. Market analysts attribute the rally to positive corporate earnings and improving economic data.

Technology and healthcare sectors led the gains, with both posting year-over-year increases of over 15%.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      readTime: 4,
   },
   {
      id: 5,
      title: 'Health Alert: New Wellness Study',
      excerpt: 'Recent research reveals surprising findings about daily habits and long-term health outcomes.',
      category: 'health',
      author: 'Dr. Lisa Wong',
      date: new Date('2026-05-26'),
      content: `A comprehensive study involving over 100,000 participants has revealed important insights about daily habits and health outcomes. Researchers found that consistent sleep schedules and regular movement significantly impact overall wellness.

The study, conducted over five years, provides actionable recommendations for maintaining long-term health and vitality.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800',
      readTime: 5,
   },
   {
      id: 6,
      title: 'Entertainment: New Film Releases',
      excerpt: 'Major studios release highly anticipated films this month across multiple genres.',
      category: 'entertainment',
      author: 'Alex Martinez',
      date: new Date('2026-05-25'),
      content: `This month brings a diverse selection of film releases, from action blockbusters to intimate dramas. Industry insiders predict strong box office performance as audiences return to theaters.

Early reviews have been positive, with critics praising both the storytelling and cinematography across the slate.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1478720568477-152d9e3fb523?w=800',
      readTime: 3,
   },
   {
      id: 7,
      title: 'Lifestyle: Travel Trends for Summer',
      excerpt: 'Experts predict popular destinations and travel styles for the upcoming summer season.',
      category: 'lifestyle',
      author: 'James Wilson',
      date: new Date('2026-05-24'),
      content: `As summer approaches, travel experts are already identifying the most popular destinations and emerging travel trends. Sustainable tourism and off-the-beaten-path experiences are gaining popularity among travelers.

Early bookings show strong interest in both traditional destinations and new, eco-friendly resort options.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      readTime: 4,
   },
   {
      id: 8,
      title: 'Politics: International Summit Concludes',
      excerpt: 'World leaders reach agreements on climate and trade during historic meeting.',
      category: 'politics',
      author: 'Robert Taylor',
      date: new Date('2026-05-23'),
      content: `An international summit concluded with significant agreements on climate change and trade policies. Representatives from over 50 countries participated in the three-day event.

The agreements are expected to shape global policy for the next decade, with particular focus on reducing carbon emissions and establishing fair trade practices.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      readTime: 5,
   },
];

export const getArticleById = (id) => {
   return MOCK_ARTICLES.find((article) => article.id === parseInt(id));
};

export const getArticlesByCategory = (categoryId) => {
   if (categoryId === 'all') return MOCK_ARTICLES;
   return MOCK_ARTICLES.filter((article) => article.category === categoryId);
};

export const searchArticles = (query, categoryId) => {
   let results = MOCK_ARTICLES;

   if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
         (article) =>
            article.title.toLowerCase().includes(lowerQuery) ||
            article.excerpt.toLowerCase().includes(lowerQuery) ||
            article.content.toLowerCase().includes(lowerQuery)
      );
   }

   if (categoryId && categoryId !== 'all') {
      results = results.filter((article) => article.category === categoryId);
   }

   return results;
};

export const getFeaturedArticles = () => {
   return MOCK_ARTICLES.filter((article) => article.featured);
};

export const getCategoryById = (id) => {
   return CATEGORIES.find((cat) => cat.id === id);
};

export const getCategoryName = (id) => {
   const category = getCategoryById(id);
   return category ? category.name : 'Unknown';
};
