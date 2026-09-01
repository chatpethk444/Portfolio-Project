import {
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGithub,
  SiHtml5,
  SiMqtt,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";

export const TECH_SECTIONS = [
  {
    title: "Programming Languages",
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "JavaScript", icon: SiNodedotjs, color: "#F7DF1E" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "CSS", icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    title: "Tools & Backend",
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "MQTT", icon: SiMqtt, color: "#660066" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    ],
  },
];
