"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "portfolio-theme";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );

    function followSystemTheme(event: MediaQueryListEvent) {
      if (localStorage.getItem(THEME_STORAGE_KEY)) {
        return;
      }

      const systemTheme = event.matches ? "dark" : "light";

      applyTheme(systemTheme);
      setTheme(systemTheme);
    }

    colorScheme.addEventListener("change", followSystemTheme);

    return () => colorScheme.removeEventListener("change", followSystemTheme);
  }, []);

  function toggleTheme() {
    const currentTheme =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      aria-label={
        theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"
      }
      className="theme-toggle inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-surface text-text-primary transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent xl:h-10 xl:w-10"
      onClick={toggleTheme}
      title="Alternar tema"
      type="button"
    >
      {theme === "light" ? (
        <Moon aria-hidden="true" className="size-5" />
      ) : (
        <Sun aria-hidden="true" className="size-5" />
      )}
    </button>
  );
}
