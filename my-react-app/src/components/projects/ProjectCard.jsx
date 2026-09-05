import { motion } from "framer-motion";
import ProjectImage from "./ProjectImage";

export default function ProjectCard({ project, onSelect }) {
  const image = project.images?.[0] || project.image_url;

  return (
    <motion.button
      type="button"
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(project)}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.985 }}
      className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-500/40"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100 sm:h-52 dark:bg-gray-950">
        <ProjectImage
          src={image}
          alt={project.title}
          fallbackTitle="Image unavailable"
          className="h-full w-full object-cover transition-transform duration-700 ease-out sm:group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {project.category && (
          <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold text-gray-900 shadow-sm backdrop-blur dark:bg-gray-900/90 dark:text-white">
            {project.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-bold leading-7 text-gray-900 transition-colors group-hover:text-emerald-600 sm:text-lg dark:text-white dark:group-hover:text-emerald-400">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {project.short_desc || "View project details"}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(project.tech_stack || []).slice(0, 4).map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="max-w-full truncate rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700 transition-transform duration-200 group-hover:-translate-y-0.5 dark:bg-emerald-500/10 dark:text-emerald-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
