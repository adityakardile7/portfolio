/**
 * The top "intro" card on the Home page — your photo, name, bio, and CTA buttons.
 * Pulled out of Home.jsx so Home only deals with the projects list.
 */
import profilePhoto from "../asset/profile.png";
const HeroCard = () => {

    const handleHireMe = () => {
      const subject = "Job Opportunity / Project Inquiry";
      const body = 
        `Hi Aditya,
        I came across your portfolio and would like to discuss a potential opportunity / project with you.
        Looking forward to hearing from you.
        Best regards,`;

      const mailtoUrl = `mailto:adityakardile77@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
    };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          Fullstack Developer
        </p>

        <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
          AVAILABLE FOR WORK
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-10">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            I’m Aditya Kardile
          </h1>

          <p className="text-gray-500 mt-5 text-lg leading-8">
            Fullstack Developer from Pune, India.
            <br />
            Passionate about creating modern applications.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-8 flex-wrap">
            <button
              onClick={handleHireMe}
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-md"
            >
              Hire Me
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText("adityakardile77@gmail.com");
                alert("Email Copied");
              }}
              className="border border-gray-200 px-6 py-3 rounded-xl bg-white text-gray-700 font-semibold"
            >
              Copy Email
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="w-44 h-44 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={profilePhoto}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
