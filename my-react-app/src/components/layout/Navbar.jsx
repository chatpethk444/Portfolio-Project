import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["About", "#home"],
  ["Projects", "#projects"],
  ["Certificates", "#certificates"],
  ["Contact", "#connect"],
];

export default function Navbar({ darkMode, onToggleDarkMode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleNavigate = (event, href) => {
    event.preventDefault();

    const target = document.querySelector(href);
    if (!target) {
      closeMenu();
      return;
    }

    // Close the mobile menu first, then scroll after its layout animation starts.
    closeMenu();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });

    window.history.replaceState(null, "", href);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-[3px] z-50 border-b px-4 py-3 transition-all duration-300 sm:px-6 sm:py-4 ${
      scrolled
        ? "border-gray-200/80 bg-white/85 shadow-lg shadow-gray-900/5 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/85"
        : "border-transparent bg-white/60 backdrop-blur-md dark:bg-gray-950/50"
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <motion.a
          href="#home"
          onClick={(event) => handleNavigate(event, "#home")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0 font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Chatpeth<span className="text-emerald-500">.dev</span>
        </motion.a>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-1 text-sm text-gray-600 md:flex dark:text-gray-300">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={(event) => handleNavigate(event, href)}
                className="rounded-lg px-3 py-2 transition-all duration-200 hover:bg-emerald-500/10 hover:text-emerald-500"
              >
                {label}
              </a>
            ))}
          </div>

          <ThemeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />

          <motion.button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            whileTap={{ scale: 0.9 }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition-colors hover:border-emerald-400 hover:text-emerald-600 md:hidden dark:border-gray-800 dark:text-gray-200"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <HiX size={22} /> : <HiMenu size={22} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto max-w-7xl overflow-hidden md:hidden"
          >
            <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-800">
              <div className="grid gap-1 rounded-2xl bg-gray-100/90 p-2 shadow-lg backdrop-blur dark:bg-gray-900/90">
                {links.map(([label, href], index) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={(event) => handleNavigate(event, href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-white hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
