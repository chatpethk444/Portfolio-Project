import { motion } from "framer-motion";
import { TECH_SECTIONS } from "../../constants/techStack";

export default function InteractiveTechGrid() {
  return (
    <div className="space-y-8 py-10 sm:space-y-12 sm:py-12">
      {TECH_SECTIONS.map((section) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500 sm:mb-8 sm:text-xs sm:tracking-[0.2em] dark:text-gray-400">
            {section.title}
          </p>
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2.5 sm:gap-4">
            {section.items.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.88, y: 14 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  whileHover={{ scale: 1.08, y: -6, rotate: index % 2 === 0 ? -2 : 2 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative flex max-w-full cursor-default items-center gap-2 overflow-hidden rounded-xl border border-gray-200 bg-white/90 px-3 py-2 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10 sm:gap-3 sm:rounded-2xl sm:px-5 sm:py-3 dark:border-gray-800 dark:bg-gray-900/90 dark:hover:border-emerald-700"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative flex shrink-0 items-center justify-center">
                    <Icon size={18} style={tech.color ? { color: tech.color } : undefined} className="tech-logo sm:hidden" />
                    <Icon size={22} style={tech.color ? { color: tech.color } : undefined} className="tech-logo hidden sm:block" />
                  </span>
                  <span className="truncate text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300">{tech.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
