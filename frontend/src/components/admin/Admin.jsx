import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  deleteProject,
  getStoredAdminPassword,
  clearStoredAdminPassword,
} from "../../api";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import AdminLogin from "./AdminLogin";

const Admin = () => {
  // Treat the user as logged in if a password is already stored for this
  // tab session. AdminLogin verifies it against the backend before storing.
  const [loggedIn, setLoggedIn] = useState(!!getStoredAdminPassword());

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const loadProjects = () => {
    setLoading(true);
    getProjects()
      .then(setProjects)
      .catch(() => setError("Could not load projects."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (loggedIn) loadProjects();
  }, [loggedIn]);

  const handleLogout = () => {
    clearStoredAdminPassword();
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <AdminLogin onSuccess={() => setLoggedIn(true)} />;
  }

  // Called by ProjectForm on submit. Returns true on success (so the
  // form knows to reset itself), false on failure.
  const handleCreate = async (formData) => {
    setError(null);
    setSuccessMsg(null);
    setSubmitting(true);
    try {
      await createProject(formData);
      setSuccessMsg("Project added successfully.");
      loadProjects();
      return true;
    } catch (err) {
      setError(err.message || "Failed to add project.");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Delete "${name}"? This can't be undone.`);
    if (!confirmed) return;

    setError(null);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete project.");
    }
  };

  return (
    <div className="mt-6 mb-10">
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-3xl font-bold text-gray-800">Admin</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Log out
          </button>
        </div>
        <p className="text-gray-500 mb-6">
          Add or remove portfolio projects. This page is not linked anywhere
          else in the site.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-4">
            {successMsg}
          </div>
        )}

        <ProjectForm onSubmit={handleCreate} submitting={submitting} />
      </div>

      <ProjectList
        projects={projects}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Admin;
