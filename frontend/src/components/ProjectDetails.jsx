import { FiArrowRight, FiArrowLeft, FiGithub } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProject, imageUrl } from "../api";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProject(id)
      .then((data) => setProject(data))
      .catch(() => setError("Project not found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E5E7EB] flex justify-center px-4 py-10">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#E5E7EB] flex justify-center px-4 py-10">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{error || "Project not found."}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-md flex items-center gap-2"
          >
            <FiArrowLeft /> Back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E5E7EB] flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 font-medium mt-2"
        >
          <FiArrowLeft /> Back
        </button>

        {/* Main Container */}
        <div className="bg-white rounded-3xl p-6 mt-5 shadow-sm">

          {/* Top Info Card */}
          <div className="bg-[#F3F4F6] rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-y-5">

              <div>
                <p className="text-gray-500">Project</p>
                <h2 className="text-xl font-semibold mt-1">
                  {project.name}
                </h2>
              </div>

              <div>
                <p className="text-gray-500">Year</p>
                <h2 className="text-xl font-semibold mt-1">
                  {project.year || "—"}
                </h2>
              </div>
            </div>
          </div>

          {/* Project Info Section */}
          <div className="mt-10">

            {/* Logo */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-700 to-blue-500 flex items-center justify-center text-white text-2xl shadow-lg">
              □
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6">
              {project.name}
            </h1>

            {project.role && (
              <p className="text-gray-500 text-base mt-2">{project.role}</p>
            )}

            {/* Description */}
            {project.description && (
              <p className="text-gray-600 text-base leading-7 mt-6 whitespace-pre-line">
                {project.description}
              </p>
            )}

            {/* Buttons */}
            {(project.website || project.githubUrl) && (
              <div className="flex gap-3 mt-6 flex-wrap">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex bg-black text-white px-5 py-3 rounded-xl items-center gap-2 font-semibold text-sm shadow-md"
                  >
                    Visit Website
                    <FiArrowRight />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex border border-gray-200 bg-white text-gray-700 px-5 py-3 rounded-xl items-center gap-2 font-semibold text-sm shadow-md"
                  >
                    <FiGithub />
                    View on GitHub
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Project Image */}
          {project.image && (
            <div className="mt-10 flex flex-col gap-6">
              <div className="bg-[#F3F4F6] rounded-3xl overflow-hidden">
                <img
                  src={imageUrl(project.image)}
                  alt={project.name}
                  className="w-full h-[320px] object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
