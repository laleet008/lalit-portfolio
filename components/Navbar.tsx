"use client";
import React, { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="md:h-24 h-16 md:px-8 px-2 flex items-center justify-between border-red-500">
      <div className="md:block hidden ">
        <a href="/" className="btn btn-1 px-4 ">
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          Laleet
        </a>
      </div>

      <div className="md:hidden block" onClick={() => setShowModal(!showModal)}>
        hamburgur
      </div>
      <div className="md:block hidden">
        <nav className="flex gap-8 ">
          <a href="/about " className="btn nav-link nav-link-ltr">
            About
          </a>
          <a href="/contact " className="btn nav-link nav-link-ltr">
            Contact
          </a>
        </nav>
      </div>

      <div className="">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Navbar;
