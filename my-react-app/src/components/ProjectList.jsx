// Backward-compatible presentation component.
// Data fetching now lives in useProjects(), keeping API concerns out of UI components.
import ProjectCard from "./projects/ProjectCard";

export default function ProjectList({ projects = [], onSelect = () => {} }) {
  if (!projects.length) {
    return <div className="py-10 text-center text-gray-500">No projects available.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id ?? project.title}
          project={project}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
