import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [dark, setDark] = useState(() => {
    // initialise from localStorage if present
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDark((prev) => !prev)}
      aria-label="Toggle dark / light theme"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
