import { imageUrl } from "../../api";

/**
 * Reusable project row/card.
 * - onClick: optional, makes the whole card clickable (used on Home)
 * - rightSlot: optional element rendered on the right (arrow icon, delete button, etc.)
 */
const ProjectCard = ({ project, onClick, rightSlot }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm ${
        onClick ? "cursor-pointer hover:scale-[1.01] transition-all duration-300" : ""
      }`}
    >
      {/* Left: image + name/role */}
      <div className="flex items-center gap-4">
        {project.image ? (
          <img
            src={imageUrl(project.image)}
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-semibold">
            {project.name?.charAt(0)}
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {project.name}
          </h2>
          <p className="text-gray-500">{project.role}</p>
        </div>
      </div>

      {/* Right: arrow, delete button, or whatever caller wants */}
      {rightSlot}
    </div>
  );
};

export default ProjectCard;
