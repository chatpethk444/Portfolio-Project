import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={darkMode}
      aria-label="Toggle dark mode"
      className={`relative flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${darkMode ? "bg-emerald-500" : "bg-gray-300"}`}
    >
      <motion.span
        className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow"
        animate={{ x: darkMode ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={darkMode ? "dark" : "light"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
          >
            {darkMode ? <FiMoon className="text-emerald-600" /> : <FiSun className="text-amber-500" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
