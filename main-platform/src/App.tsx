import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './auth/store';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/public/Landing';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';
import { Dashboard } from './pages/dashboard/Dashboard';
import { ModuleFrame } from './components/modules/ModuleFrame';
import { modules } from './config/modules';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          
          {/* Module routes */}
          {modules.map((module) => (
            <Route
              key={module.id}
              path={`${module.path}/*`}
              element={isAuthenticated ? <ModuleFrame module={module} /> : <Navigate to="/login" />}
            />
          ))}
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
