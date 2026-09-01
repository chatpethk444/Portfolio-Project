import { useEffect, useState } from "react";
import { fetchProjects } from "../api/projects";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects();
        if (active) setProjects(data);
      } catch (requestError) {
        if (active) {
          setError("Unable to load projects. Please try again later.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProjects();
    return () => {
      active = false;
    };
  }, []);

  return { projects, loading, error };
}
