import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function ProjectSection({ projects, loading, error, onSelect }) {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center sm:mb-10"
      >
        <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">Projects</h2>
        <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400" />
      </motion.div>

      {loading && <p className="py-10 text-center text-gray-500">Loading projects...</p>}
      {error && <p className="py-10 text-center text-red-500">{error}</p>}
      {!loading && !error && projects.length === 0 && <p className="py-10 text-center text-gray-500">No projects available yet.</p>}

      {!loading && !error && projects.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id ?? project.title} project={project} onSelect={onSelect} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
