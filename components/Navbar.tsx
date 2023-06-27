import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <header className="h-24 px-8 flex items-center justify-between border-red-500">
      <a href="/" className="btn btn-1">
        <svg>
          <rect x="0" y="0" fill="none" width="100%" height="100%" />
        </svg>
        Laleet
      </a>

      <nav className="flex gap-8">
        <a href="/about " className="btn nav-link nav-link-ltr">
          About
        </a>
        <a href="/contact " className="btn nav-link nav-link-ltr">
          Contact
        </a>
      </nav>
      <div className="btn">
        {" "}
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Navbar;
