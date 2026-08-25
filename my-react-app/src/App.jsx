import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import apiClient from "./api/client";

import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiPython,
  SiSupabase,
  SiHtml5,
  SiMysql,
  SiGit,
  SiGithub,
  SiC,
  SiCplusplus,
  SiVite,
  SiFastapi,
} from "react-icons/si";

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      role="switch"
      aria-checked={darkMode}
      aria-label="Toggle Dark Mode"
      className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        darkMode ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-700"
      }`}
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800 z-10 overflow-hidden"
        animate={{ x: darkMode ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={darkMode ? "dark" : "light"}
            initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 180, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {darkMode ? (
              <FiMoon className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <FiSun className="w-3.5 h-3.5 text-amber-500" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

const Programming_Languages_ITEMS = [
  { name: "Python", icon: SiPython, color: "#2496ED" },
  { name: "C", icon: SiC, color: "#A8B9CC" },
  { name: "C++", icon: SiCplusplus, color: "#A8B9CC" },
  { name: "HTML", icon: SiHtml5, color: "#E34C26" },
  { name: "JavaScript", icon: SiNodedotjs, color: "#c7a71b" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
];

const FRAMEWORKS_ITEMS = [{ name: "React", icon: SiReact, color: "#61DAFB" }];
const DATABASE_ITEMS = [
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql, color: "#4169E1" },
];
const TOOLS_ITEMS = [
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Supabase", icon: SiSupabase, color: "#3f7233" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: null },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
];
const BACKEND_ITEMS = [{ name: "FastAPI", icon: SiFastapi, color: "#009688" }];

const InteractiveTechGrid = () => {
  const sections = [
    { title: "PROGRAMMING LANGUAGES", items: Programming_Languages_ITEMS },
    { title: "FRAMEWORKS", items: FRAMEWORKS_ITEMS },
    { title: "DATABASES", items: DATABASE_ITEMS },
    { title: "TOOLS", items: TOOLS_ITEMS },
    { title: "BACKEND", items: BACKEND_ITEMS },
  ];

  return (
    <div className="w-full py-12 px-4 my-8 space-y-12">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="text-center text-xs tracking-widest text-gray-500 dark:text-gray-400 mb-8 uppercase font-semibold">
            {section.title}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 max-w-4xl mx-auto">
            {section.items.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                  transition={{
                    duration: 3 + (index % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group cursor-pointer"
                >
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition duration-300"
                    style={{ backgroundColor: tech.color || "#38bdf8" }}
                  />
                  <div className="relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md backdrop-blur-md group-hover:border-cyan-500/50 transition-all duration-300">
                    <Icon
                      size={22}
                      style={tech.color ? { color: tech.color } : {}}
                      className={`transition-transform duration-300 group-hover:scale-110 ${
                        !tech.color ? "text-slate-900 dark:text-white" : ""
                      }`}
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const TypewriterText = ({ text, delay = 0, speed = 0.03, className = "" }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay },
    },
  };
  const child = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline" },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Terminal = () => (
  <motion.div
    whileHover={{
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)",
      borderColor: "rgba(16, 185, 129, 0.4)",
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="w-full rounded-2xl bg-gray-900 text-gray-100 p-6 font-mono text-xs sm:text-sm border border-gray-800 shadow-2xl min-h-[340px] flex flex-col justify-start cursor-pointer transition-colors"
  >
    <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3 flex-shrink-0">
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer"
      />
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer"
      />
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer"
      />
      <span className="text-xs text-gray-500 ml-2 select-none">config.ts</span>
    </div>

    <div className="space-y-2 leading-relaxed text-left">
      <p className="text-gray-500 min-h-[1.5rem]">
        <TypewriterText text="// Developer Profile" delay={0.2} />
      </p>
      <p className="min-h-[1.5rem]">
        <TypewriterText text="const " className="text-purple-400" delay={0.6} />
        <TypewriterText
          text="developer "
          className="text-yellow-300"
          delay={0.8}
        />
        <TypewriterText text="= {" delay={1.1} />
      </p>
      <p className="pl-4 min-h-[1.5rem]">
        <TypewriterText text="Name: " className="text-blue-400" delay={1.3} />
        <TypewriterText
          text="'Chatpeth Karisuk',"
          className="text-green-300"
          delay={1.5}
        />
      </p>
      <p className="pl-4 min-h-[1.5rem]">
        <TypewriterText
          text="Location: "
          className="text-blue-400"
          delay={1.8}
        />
        <TypewriterText
          text="'Thailand/Bangkok',"
          className="text-green-300"
          delay={2.1}
        />
      </p>
      <p className="pl-4 min-h-[1.5rem]">
        <TypewriterText text="Email: " className="text-blue-400" delay={2.4} />
        <TypewriterText
          text="'chatpethkarisuk@gmail.com',"
          className="text-green-300"
          delay={2.7}
        />
      </p>
      <p className="pl-4 min-h-[1.5rem]">
        <TypewriterText text="Tel: " className="text-blue-400" delay={3.0} />
        <TypewriterText
          text="'0910216010'"
          className="text-green-300"
          delay={3.3}
        />
      </p>
      <p className="min-h-[1.5rem]">
        <TypewriterText text="};" delay={3.6} />
      </p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
        className="text-green-400 pt-2 flex items-center gap-1 min-h-[1.5rem]"
      >
        <span>❯ ready_to_build()</span>
        <span className="w-2 h-4 bg-green-400 inline-block animate-pulse" />
      </motion.p>
    </div>
  </motion.div>
);

/* จุดปรับปรุงที่ 1: ปรับใช้ Field Names ให้ตรงกับ Schema จาก Database (snake_case) */
const ProjectModal = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullSize, setIsFullSize] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setIsFullSize(false);
  }, [project]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  const currentImage = project.images?.[activeImageIndex] || "";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-left relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors z-20"
          >
            ✕
          </button>

          {currentImage && (
            <div
              onClick={() => setIsFullSize(true)}
              className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-3 bg-gray-50 dark:bg-gray-950 relative cursor-zoom-in group flex items-center justify-center border border-gray-100 dark:border-gray-800"
            >
              <img
                src={currentImage}
                alt={`${project.title} screenshot`}
                className="max-w-full max-h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                🔍 คลิกเพื่อดูรูปขนาดเต็ม
              </div>
            </div>
          )}

          {project.images && project.images.length > 1 && (
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin">
              {project.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${
                    activeImageIndex === idx
                      ? "border-emerald-500 dark:border-emerald-400 scale-105 shadow-sm"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`thumb-${idx}`}
                    className="max-w-full max-h-full object-contain p-0.5"
                  />
                </button>
              ))}
            </div>
          )}

          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold mt-1 mb-4 text-gray-900 dark:text-white">
            {project.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
            {project.full_desc || project.short_desc}
          </p>

          {project.tech_stack && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.features && (
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Key Features
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            {project.canva_url && (
              <a
                href={project.canva_url}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm rounded-xl hover:opacity-90 transition-opacity"
              >
                Canva
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium text-sm rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <FaGithub className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {isFullSize && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFullSize(false)}
              className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            >
              <button
                onClick={() => setIsFullSize(false)}
                className="absolute top-6 right-6 text-white text-xl font-bold bg-white/10 w-10 h-10 rounded-full hover:bg-white/20 transition-colors"
              >
                ✕
              </button>
              <img
                src={currentImage}
                alt="Full size view"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.target);
    formData.append("access_key", "2ea60d4f-c11f-4c63-a278-c2fcd1733516");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.message || "เกิดข้อผิดพลาดในการส่งข้อความ");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto mt-8 p-8 rounded-3xl bg-gray-100 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 backdrop-blur-sm text-left"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
        />

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
          </div>

          <label className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">
            NAME
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">
            EMAIL
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">
            MESSAGE
          </label>
          <textarea
            name="message"
            required
            rows="4"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white transition-all text-sm resize-none"
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3.5 px-6 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              Sending...
            </>
          ) : status === "success" ? (
            "✓ Message Sent Successfully!"
          ) : (
            "Send Message"
          )}
        </motion.button>

        {status === "error" && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-2 text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Projects จาก Backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get("/projects");
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("ไม่สามารถโหลดข้อมูลโปรเจกต์ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll(
      "section[id], footer[id], div[id='projects']",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-white transition-colors duration-300 font-sans">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-6 left-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border border-gray-200 dark:border-gray-800 rounded-full px-2 py-2 z-40 flex items-center gap-1 sm:gap-2 w-max transition-colors"
      >
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
            activeSection === "home"
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          Home
        </a>

        <a
          href="#projects"
          onClick={(e) => scrollToSection(e, "projects")}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
            activeSection === "projects"
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          Projects
        </a>

        <a
          href="#connect"
          onClick={(e) => scrollToSection(e, "connect")}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
            activeSection === "connect"
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          Contact
        </a>

        <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-40 pb-16 px-8 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col w-full order-1"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <div className="relative w-28 h-28 sm:w-35 sm:h-35 rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-blue-500 shadow-xl group">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-white dark:border-gray-900">
                <img
                  src="/profile.jpg"
                  alt="Chatpeth Karisuk Profile"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>
              <span
                className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"
                title="Available for work"
              />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 md:mb-8 text-left"
          >
            Hi,I'm Chatpeth Karisuk
          </motion.h1>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-2xl tracking-tight text-gray-900 dark:text-white mb-6 md:mb-8 text-left"
          >
            Computer Engineering Student
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed text-left"
          >
            A motivated 4th-year seeking an Co-operative / internship in
            Software Testing / QA, IT Support, or related fields. Brings
            hands-on experience in IT support and hardware troubleshooting,
            combined with a strong work ethic, adaptability, and the ability to
            perform effectively under pressure. Eager to apply academic
            knowledge to solve real-world technical problems and contribute to
            team success.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-4 relative"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/chatpethk444"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <FaGithub size={18} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/in/chatpeth-karisuk-7305052ab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <FaLinkedin size={18} />
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="flex-1 w-full order-2">
          <Terminal />
        </div>
      </section>

      <InteractiveTechGrid />

      {/* Projects Section */}
      <section
        id="about"
        className="px-8 md:px-16 py-16 md:py-24 max-w-7xl mx-auto"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            id="projects"
            variants={fadeInUp}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-10 md:p-14 rounded-3xl flex flex-col text-left shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-10 text-gray-900 dark:text-white">
                Projects
              </h2>
            </div>

            {/* จุดปรับปรุงที่ 2 & 3: ปรับปรุงส่วนเรนเดอร์ข้อมูลแบบ Dynamic และรองรับการดึงข้อมูลจาก FastAPI */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto">
                {[1, 2].map((n) => (
                  <div key={n} className="animate-pulse">
                    <div className="w-full h-36 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 font-medium mb-2">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs text-emerald-500 hover:underline"
                >
                  ลองใหม่อีกครั้ง
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer"
                  >
                    <div className="w-full h-36 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4 overflow-hidden relative border border-gray-200/50 dark:border-gray-700/50">
                      <img
                        src={project.images?.[0] || "/placeholder.png"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="text-[10px] font-semibold bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-2 py-1 rounded-md shadow-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:underline decoration-2 underline-offset-4 text-sm">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {project.short_desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        id="connect"
        className="bg-gray-900 dark:bg-black text-white pt-20 pb-12 px-8 flex flex-col items-center border-t border-gray-800"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center max-w-2xl leading-tight">
          Contact Me
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-md text-center mb-4"></p>
        <ContactForm />
        <div className="w-full max-w-7xl border-t border-gray-800 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} Chatpeth Karisuk. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="hover:text-white transition-colors"
              onClick={() =>
                window.open("https://github.com/chatpethk444", "_blank")
              }
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              onClick={() =>
                window.open(
                  "https://linkedin.com/in/chatpeth-karisuk-7305052ab",
                  "_blank",
                )
              }
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Portfolio;
