import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import ProjectImage from "./ProjectImage";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

export default function ProjectModal({ project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);

  useBodyScrollLock(Boolean(project));

  useEffect(() => {
    setActiveImageIndex(0);
    setFullScreen(false);
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        if (fullScreen) setFullScreen(false);
        else onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, fullScreen, onClose]);

  if (!project) return null;

  const images = project.images?.length ? project.images : project.image_url ? [project.image_url] : [];
  const currentImage = images[activeImageIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button type="button" aria-label="Close project details" className="absolute inset-0 cursor-default" onClick={onClose} />

        <motion.article
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ opacity: 0, scale: 0.96, y: 36 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 36 }}
          transition={{ type: "spring", stiffness: 280, damping: 25 }}
          className="relative z-10 max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-gray-200 bg-white p-4 pb-6 shadow-2xl sm:max-h-[90vh] sm:rounded-3xl sm:p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-900"
        >
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close"
            whileHover={{ rotate: 90, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 top-3 z-20 cursor-pointer rounded-full bg-gray-100 px-3 py-2 text-gray-600 transition-colors hover:bg-gray-200 sm:right-5 sm:top-5 dark:bg-gray-800 dark:text-gray-300"
          >
            ✕
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setFullScreen(true)}
            whileHover={{ scale: 1.01 }}
            className="block w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-100 pr-8 dark:bg-gray-950 sm:pr-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage || "fallback"}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectImage src={currentImage} alt={project.title} fallbackTitle="Image unavailable" className="h-48 w-full object-contain sm:h-80" />
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <motion.button
                  type="button"
                  key={image}
                  onClick={() => setActiveImageIndex(index)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`h-14 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-colors sm:h-16 sm:w-20 ${index === activeImageIndex ? "border-emerald-500 shadow-md shadow-emerald-500/20" : "border-transparent"}`}
                >
                  <ProjectImage src={image} alt={`${project.title} ${index + 1}`} fallbackTitle="Image unavailable" className="h-full w-full object-cover" />
                </motion.button>
              ))}
            </div>
          )}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } }}
            className="mt-5 sm:mt-6"
          >
            {project.category && <motion.p variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }} className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 sm:text-xs">{project.category}</motion.p>}
            <motion.h2 variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="mt-2 pr-8 text-xl font-bold leading-8 text-gray-900 sm:text-2xl dark:text-white">{project.title}</motion.h2>
            <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-300">{project.full_desc || project.short_desc}</motion.p>

            {project.tech_stack?.length > 0 && (
              <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="mt-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Tech Stack</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => <motion.span whileHover={{ y: -2 }} key={tech} className="max-w-full truncate rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800">{tech}</motion.span>)}
                </div>
              </motion.div>
            )}

            {project.features?.length > 0 && (
              <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="mt-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Key Features</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.04 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {project.github_url && <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-gray-900/10 dark:bg-white dark:text-gray-900"><FaGithub /> GitHub Repository</motion.a>}
              {project.canva_url && <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={project.canva_url} target="_blank" rel="noreferrer" className="cursor-pointer rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-medium transition-colors hover:border-emerald-400 hover:text-emerald-600 dark:border-gray-700">Docs</motion.a>}
            </motion.div>
          </motion.div>
        </motion.article>

        <AnimatePresence>
          {fullScreen && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-2 sm:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFullScreen(false)}
            >
              <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="max-h-full max-w-full">
                <ProjectImage src={currentImage} alt={project.title} fallbackTitle="Image unavailable" className="max-h-full max-w-full object-contain" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
