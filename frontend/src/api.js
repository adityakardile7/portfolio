// Base URL of the Spring Boot backend.
// In local dev this defaults to localhost:4000.
// When deployed, set VITE_API_BASE_URL in a .env file (see .env.example).
const BACKEND_ORIGIN = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const API_BASE = BACKEND_ORIGIN + "/api";

// The admin password is stored only in the browser's sessionStorage
// (cleared when the tab closes) - never in code, never sent anywhere
// except as a header on write requests to your own backend.
const ADMIN_PASSWORD_KEY = "portfolio_admin_password";

export function getStoredAdminPassword() {
  return sessionStorage.getItem(ADMIN_PASSWORD_KEY) || "";
}

export function setStoredAdminPassword(password) {
  sessionStorage.setItem(ADMIN_PASSWORD_KEY, password);
}

export function clearStoredAdminPassword() {
  sessionStorage.removeItem(ADMIN_PASSWORD_KEY);
}

export async function verifyAdminPassword(password) {
  const res = await fetch(`${API_BASE}/admin/verify`, {
    headers: { "X-Admin-Password": password },
  });
  return res.ok;
}

export async function getProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getProject(id) {
  const res = await fetch(`${API_BASE}/projects/${id}`);
  if (!res.ok) throw new Error("Project not found");
  return res.json();
}

export async function createProject(formData) {
  // formData must be a FormData instance (so the image file can be attached)
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: {
      "X-Admin-Password": getStoredAdminPassword(),
    },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 401) {
      throw new Error("Incorrect admin password.");
    }
    throw new Error(err.error || "Failed to create project");
  }
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "DELETE",
    headers: {
      "X-Admin-Password": getStoredAdminPassword(),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 401) {
      throw new Error("Incorrect admin password.");
    }
    throw new Error(err.error || "Failed to delete project");
  }
  return res.json();
}

// Helper to turn a relative image path like "/uploads/xxx.png"
// into a full URL pointing at the backend.
export function imageUrl(url) {
  return url || null;
}
