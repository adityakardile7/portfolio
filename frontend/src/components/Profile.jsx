import EducationCard from "./EducationCard";
import SkillsList from "./SkillsList";
import profilePhoto from "../asset/profile.png";

const education = [
  {
    title: "BE ENTC",
    institute: "Smt. Kashibai Navale College Of Engineering",
    scoreLabel: "CGPA",
    scoreValue: "7.62",
  },
  {
    title: "12th",
    institute: "New Arts, Commerce and Science College",
    scoreLabel: "Percentage",
    scoreValue: "88%",
  },
  {
    title: "10th",
    institute: "Anand Vidyalaya",
    scoreLabel: "Percentage",
    scoreValue: "88%",
  },
];

const skills = ["Flutter", "Java", "Spring Boot", "SQL", "React.js"];

const Profile = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm mt-8">
      {/* Profile Image */}
      <div className="flex justify-center">
        <div className="w-40 h-40 rounded-full overflow-hidden border-[6px] border-gray-100 shadow-md">
         <img
            src={profilePhoto}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold text-gray-800">Aditya Kardile</h1>
        <p className="text-gray-500 mt-2 text-lg">Fullstack Developer</p>
      </div>

      {/* Info Card */}
      <div className="bg-[#F3F4F6] rounded-2xl p-5 mt-8">
        {/* Education */}
        <div className="mb-5">
          <p className="text-gray-500 text-sm mb-4">Education</p>

          <div className="space-y-4">
            {education.map((edu) => (
              <EducationCard key={edu.title} {...edu} />
            ))}
          </div>
        </div>

        {/* Skills */}
        <SkillsList skills={skills} />
      </div>
    </div>
  );
};

export default Profile;
