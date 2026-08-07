import { useState } from 'react';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <Dashboard onLogout={() => setIsAuthenticated(false)} initialLoading={true} />;
  }

  return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
}
