import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

import profileImage from "./assets/profile.jpg";
import ContactForm from "./components/ContactForm";
import CertificateSection from "./components/certificates/CertificateSection";
import Navbar from "./components/layout/Navbar";
import DeveloperTerminal from "./components/profile/DeveloperTerminal";
import InteractiveTechGrid from "./components/profile/InteractiveTechGrid";
import ProjectModal from "./components/projects/ProjectModal";
import ProjectSection from "./components/projects/ProjectSection";
import { useProjects } from "./hooks/useProjects";
import { useCertificates } from "./hooks/useCertificates";
import { useTheme } from "./hooks/useTheme";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function App() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { projects, loading, error } = useProjects();
  const {
    certificates,
    loading: certificatesLoading,
    error: certificatesError,
  } = useCertificates();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-50 text-gray-900 transition-colors duration-500 dark:bg-gray-950 dark:text-white">
      <Navbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />
      </div>

      <main className="relative z-10 pt-[64px] sm:pt-[72px]">
        <section
          id="home"
          className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:py-20"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/70 px-3 py-1 font-mono text-xs text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 sm:text-sm"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Hi, I am Chatpeth Karisuk
            </motion.p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:mt-5 sm:text-5xl md:text-6xl">
              Computer{" "}
              <span className="animated-gradient-text">
                Engineering
              </span>{" "}
              Student.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base sm:leading-8 lg:mx-0 dark:text-gray-300"
            >
              Driven 4th-year Computer Engineering student seeking a Cooperative
              Education or Internship position in Software Tester / QA or
              Full-Stack Developer. Offers a robust technical foundation in
              end-to-end web application development and hardware systems
              integration. Skilled in leveraging engineering problem-solving
              methodologies to tackle real-world challenges. Highly adaptable,
              eager to master emerging technologies, and proven capable of
              collaborating effectively in fast-paced team environments to
              deliver high-quality deliverables under pressure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.55 }}
              className="mt-6 flex justify-center gap-3 lg:justify-start"
            >
              <motion.a
                href="https://github.com/chatpethk444"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-800 shadow-sm backdrop-blur transition-colors hover:border-emerald-400 hover:text-emerald-600 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-100 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
              >
                <FaGithub className="h-5 w-5" />
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/chatpeth-karisuk-7305052ab"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-800 shadow-sm backdrop-blur transition-colors hover:border-emerald-400 hover:text-emerald-600 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-100 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
              >
                <FaLinkedin className="h-5 w-5" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.6 }}
              className="mt-5 flex flex-col justify-center gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group rounded-xl bg-gray-900 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-gray-900/15 transition-shadow hover:shadow-xl dark:bg-white dark:text-gray-900"
              >
                View Projects{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
              <motion.a
                href="#connect"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-xl border border-gray-300 bg-white/50 px-5 py-3 text-center text-sm font-semibold backdrop-blur transition-colors hover:border-emerald-400 hover:text-emerald-600 dark:border-gray-700 dark:bg-gray-900/40"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="order-1 flex min-w-0 flex-col gap-4 sm:gap-6 lg:order-2"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-[280px] sm:max-w-sm"
            >
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-emerald-400/30 via-cyan-400/20 to-blue-500/20 blur-2xl sm:-inset-3" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white p-2 shadow-2xl transition-transform duration-500 hover:rotate-[1deg] sm:rounded-[2rem] dark:border-gray-800 dark:bg-gray-900">
                <img
                  src={profileImage}
                  alt="Chatpeth Karisuk profile"
                  className="aspect-square w-full rounded-[1.15rem] object-cover object-center sm:rounded-[1.5rem]"
                />
                <div className="absolute inset-2 rounded-[1.15rem] bg-gradient-to-t from-gray-950/20 to-transparent pointer-events-none sm:rounded-[1.5rem]" />
              </div>
            </motion.div>
            <DeveloperTerminal />
          </motion.div>
        </section>

        <section
          id="about"
          className="relative border-y border-gray-200 bg-white/60 px-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/20 sm:px-6"
        >
          <div className="mx-auto max-w-7xl">
            <InteractiveTechGrid />
          </div>
        </section>

        <ProjectSection
          projects={projects}
          loading={loading}
          error={error}
          onSelect={setSelectedProject}
        />

        <CertificateSection
          certificates={certificates}
          loading={certificatesLoading}
          error={certificatesError}
        />
      </main>

      <footer
        id="connect"
        className="relative overflow-hidden border-t border-gray-800 bg-gray-950 px-4 py-14 text-white sm:px-6 sm:py-20"
      >
        <div className="footer-glow pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 sm:text-sm sm:tracking-[0.25em]">
              Connect
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Let's build something useful.
            </h2>
          </motion.div>
          <ContactForm />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-center text-xs text-gray-400 md:mt-16 md:flex-row md:text-left"
          >
            <p>
              © {new Date().getFullYear()} Chatpeth Karisuk. All rights
              reserved.
            </p>
            <div className="flex gap-5">
              <motion.a
                whileHover={{ y: -3, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/chatpethk444"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-emerald-400"
              >
                <FaGithub className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com/in/chatpeth-karisuk-7305052ab"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-emerald-400"
              >
                <FaLinkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
