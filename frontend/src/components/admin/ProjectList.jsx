import { FiTrash2 } from "react-icons/fi";
import ProjectCard from "./ProjectCard";

/**
 * Shows the list of existing projects with a delete button on each.
 * Pure presentational + delegates the actual delete action to onDelete.
 */
const ProjectList = ({ projects, loading, onDelete }) => {
  return (
    <div className="bg-[#F3F4F6] rounded-3xl p-6 mt-6">
      <p className="text-2xl font-semibold text-gray-700 mb-4">
        Existing Projects
      </p>

      {loading && <p className="text-gray-500">Loading…</p>}

      {!loading && projects.length === 0 && (
        <p className="text-gray-500">No projects yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            rightSlot={
              <button
                onClick={() => onDelete(project.id, project.name)}
                className="text-red-500 hover:bg-red-50 p-3 rounded-xl"
                title="Delete project"
              >
                <FiTrash2 className="text-xl" />
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
