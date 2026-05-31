import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
   return (
      <Router>
         <Header />
         <main>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/article/:id" element={<ArticleDetailPage />} />
               <Route path="/search" element={<SearchPage />} />
               <Route
                  path="*"
                  element={
                     <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
                        <h1>404 - Page not found</h1>
                     </div>
                  }
               />
            </Routes>
         </main>
      </Router>
   );
}

export default App;
