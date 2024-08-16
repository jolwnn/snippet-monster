import "@/App.css";

import { useAuth } from "@/hooks/useAuth";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/auth" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// If user is authenticated, at /, redirect to /dashboard. Otherwise, display landing page.
function Root() {
  const { session } = useAuth();
  return session ? <Navigate to="/dashboard" replace /> : <Landing />;
}

// If user is authenticated, at /dashboard, display dashboard. Otherwise, redirect to /auth.
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

export default App;
