import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { session, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-mist">
        <p className="text-sm text-ink-muted">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-surface-mist px-4 text-center">
        <p className="text-lg text-ink">This account doesn't have admin access.</p>
        <p className="text-sm text-ink-muted">
          Contact whoever set up the site to be added as an admin.
        </p>
      </div>
    );
  }

  return children;
}
