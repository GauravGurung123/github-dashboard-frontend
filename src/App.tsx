import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RepositoryProvider } from './context/RepositoryContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { RepositorySelect } from './pages/RepositorySelect';
import { RepositoryDetail } from './pages/RepositoryDetail';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <RepositoryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/repositories" element={<RepositorySelect />} />
          <Route path="/repository/:owner/:repo" element={<RepositoryDetail />} />
          <Route path="/dashboard/:owner/:repo/:username" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </RepositoryProvider>
  );
}

export default App;
