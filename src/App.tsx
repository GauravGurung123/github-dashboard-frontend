import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { RepositoryProvider } from './context/RepositoryContext';
import { AuthProvider } from './context/AuthContext';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {RepositorySelect} from './pages/RepositorySelect';
import {RepositoryDetail} from './pages/RepositoryDetail';
import {Dashboard} from './pages/Dashboard';
import {NotFound} from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RepositoryProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/repositories" element={<RepositorySelect />} />
            <Route path="/repository/:owner/:repo" element={<RepositoryDetail />} />
            {/* Dashboard with all parameters */}
            <Route path="/dashboard/:owner/:repo/:username" element={<Dashboard />} />
            {/* Dashboard with just username */}
            <Route path="/dashboard/:username" element={<Dashboard />} />
            {/* Base dashboard route - redirects to user's dashboard or repositories */}
            <Route 
              path="/dashboard" 
              element={
                <DashboardRedirect />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RepositoryProvider>
      </AuthProvider>
    </Router>
  );
}

// Component to handle dashboard redirects
function DashboardRedirect() {
  // You can implement logic here to get the current user's info
  // For now, redirecting to repositories page as a fallback
  return <Navigate to="/repositories" replace />;
}

export default App;
