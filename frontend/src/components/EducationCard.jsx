/**
 * One education entry (degree, institute, score).
 * Used inside the Education list on the Profile page.
 */
const EducationCard = ({ title, institute, scoreLabel, scoreValue }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500 mt-1">{institute}</p>
      <p className="text-sm text-gray-400 mt-1">
        {scoreLabel} : {scoreValue}
      </p>
    </div>
  );
};

export default EducationCard;
