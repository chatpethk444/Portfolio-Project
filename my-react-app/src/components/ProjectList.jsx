// src/components/ProjectList.jsx
import { useEffect, useState } from "react";
import apiClient from "../api/client";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/projects")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center py-10">กำลังโหลดข้อมูล Projects...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          {project.image_url && (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{project.description}</p>

            {/* Display Tech Stack Badge */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 mt-5">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 hover:text-black font-medium text-sm"
                >
                  GitHub
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
