import { useState } from "react";
import { verifyAdminPassword, setStoredAdminPassword } from "../../api";

/**
 * Simple password gate shown in front of the Admin panel.
 * On success, stores the password in sessionStorage (cleared when the
 * tab closes) and calls onSuccess() so the parent can show the real panel.
 */
const AdminLogin = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setChecking(true);

    try {
      const ok = await verifyAdminPassword(password);
      if (ok) {
        setStoredAdminPassword(password);
        onSuccess();
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <div className="bg-white rounded-3xl p-8 shadow-sm w-full max-w-sm mt-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Admin Login</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Enter the admin password to manage projects.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            disabled={checking || !password}
            className="w-full bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-md disabled:opacity-50"
          >
            {checking ? "Checking…" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
