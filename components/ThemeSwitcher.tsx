"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

import darkIcon from "../public/assets/dark-mode.svg";
import lightIcon from "../public/assets/light-mode-white.svg";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark, setTheme]);

  return (
    <div className="flex items-center">
      <button
        className={`relative flex items-center justify-between w-16 h-8 rounded-full bg-gray-300 p-1 focus:outline-none transition-transform duration-300 ${
          isDark ? "bg-gray" : ""
        }`}
        onClick={toggleTheme}
      >
        <span
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
            isDark ? "translate-x-8 text-white" : "text-gray-500"
          }`}
        >
          {isDark ? (
            <div className="bg-black w-8 h-8 rounded-full flex mr-2 items-center justify-center">
              <Image alt="dark" src={lightIcon} height={18} width={18} />
            </div>
          ) : (
            <div className="bg-white ml-2 w-8 h-8 rounded-full flex items-center justify-center">
              <Image alt="dark" src={darkIcon} height={18} width={18} />
            </div>
          )}
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
