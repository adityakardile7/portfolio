import { useState } from "react";
import { FiUpload } from "react-icons/fi";

/**
 * Pure form component. Knows nothing about the API —
 * it just collects input and calls onSubmit(formData) when ready.
 */
const ProjectForm = ({ onSubmit, submitting }) => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    year: "",
    description: "",
    website: "",
    githubUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file || null);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const resetForm = () => {
    setForm({ name: "", role: "", year: "", description: "", website: "", githubUrl: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!form.name.trim()) {
      setLocalError("Project name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("year", form.year);
    formData.append("description", form.description);
    formData.append("website", form.website);
    formData.append("githubUrl", form.githubUrl);
    if (imageFile) formData.append("image", imageFile);

    const success = await onSubmit(formData);
    if (success) resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {localError && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl">
          {localError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Project Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
            placeholder="e.g. Rectangle"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Role / Category
          </label>
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
            placeholder="e.g. Product Design"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Year</label>
          <input
            type="text"
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
            placeholder="e.g. 2026"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Website URL
          </label>
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            GitHub URL
          </label>
          <input
            type="text"
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3"
          placeholder="What is this project about?"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1">
          Project Image
        </label>
        <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer w-fit">
          <FiUpload />
          <span>{imageFile ? imageFile.name : "Choose image"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-24 h-24 rounded-xl object-cover mt-3"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-md disabled:opacity-50"
      >
        {submitting ? "Adding…" : "Add Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
