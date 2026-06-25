import { useEffect, useState } from "react";
import { getProjects } from "../api";
import HeroCard from "./HeroCard";
import ProjectsSection from "./ProjectsSection";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch(() => setError("Could not load projects. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mt-6">
      <HeroCard />
      <ProjectsSection projects={projects} loading={loading} error={error} />
    </div>
  );
};

export default Home;
