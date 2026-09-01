import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

function getInitialTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme === "dark";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function useTheme() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem(STORAGE_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  return {
    darkMode,
    toggleDarkMode: () => setDarkMode((current) => !current),
  };
}
