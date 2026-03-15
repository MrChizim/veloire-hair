import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from '@/lib/AuthContext';
import { pagesConfig } from './pages.config';
import PageNotFound from './lib/PageNotFound';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = Pages[mainPageKey];

const LayoutWrapper = ({ children, currentPageName }) =>
  Layout ? <Layout currentPageName={currentPageName}>{children}</Layout> : <>{children}</>;

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LayoutWrapper currentPageName={mainPageKey}><MainPage /></LayoutWrapper>} />
            {Object.entries(Pages).map(([path, Page]) => (
              <Route key={path} path={`/${path}`} element={<LayoutWrapper currentPageName={path}><Page /></LayoutWrapper>} />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
