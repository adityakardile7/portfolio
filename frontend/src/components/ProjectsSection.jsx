import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import ProjectCard from "./admin/ProjectCard";

/**
 * The "Projects" panel on Home — loading/error/empty states,
 * and the clickable list of project cards.
 */
const ProjectsSection = ({ projects, loading, error }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F3F4F6] rounded-3xl p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-gray-700">Projects</p>
      </div>

      {loading && <p className="text-gray-500 mt-6">Loading projects…</p>}

      {error && <p className="text-red-500 mt-6">{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p className="text-gray-500 mt-6">No projects added yet.</p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => navigate(`/project/${project.id}`)}
            rightSlot={<FiArrowRight className="text-2xl text-gray-400" />}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
