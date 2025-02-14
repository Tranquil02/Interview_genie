import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <Sun
        className={`absolute transition-all duration-300 ease-in-out ${
          theme === "dark"
            ? "opacity-0 scale-0 rotate-90"
            : "opacity-100 scale-100 rotate-0"
        }`}
      />
      {/* Moon Icon */}
      <Moon
        className={`absolute text-gray-200 transition-all duration-300 ease-in-out ${
          theme === "dark"
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-0 -rotate-90"
        }`}
      />
    </button>
  );
}
