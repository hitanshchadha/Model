import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Layout from './components/Layout.jsx';
import PredictionPage from './components/PredictionPage.jsx';
import NotFound from './components/NotFound.jsx';
import { PAGES } from './siteConfig.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {PAGES.map((page) => (
            <Route key={page.path} path={page.path} element={<PredictionPage key={page.path} page={page} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
