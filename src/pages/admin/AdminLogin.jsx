import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logoBlack from "../../assets/logos/logoblack.png";

export default function AdminLogin() {
  const { session, isAdmin, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) {
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-mist px-4">
      <div className="w-full max-w-sm border border-line bg-surface-white p-8 shadow-card">
        <img src={logoBlack} alt="Dieux" className="mb-8 h-9 w-auto object-contain" />
        <h1 className="mb-1 text-xl text-ink">Admin sign in</h1>
        <p className="mb-6 text-sm text-ink-muted">Manage website content.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line bg-surface-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-navy"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line bg-surface-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-navy"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-medium text-ink-inverse transition-colors hover:bg-brand-navy-light disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
