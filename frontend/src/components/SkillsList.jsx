/**
 * Renders the row of skill "pill" badges on the Profile page.
 */
const SkillsList = ({ skills }) => {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-3">Skills</p>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-white px-4 py-2 rounded-xl shadow-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsList;
