import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 h-20 w-full justify-center bg-[#ffffffb8] backdrop-blur-[20px] backdrop-saturate-[180%]">
      <div className="m-auto flex h-full w-full max-w-screen-xl justify-between px-6 sm:px-16">
        {/* 1280px */}
        <div className="w-full items-center flex">
          <Link
            className={`text-black text-display-sm font-bold  ${
              logoAnimation ? "shining-effect" : ""
            }`}
            href="/"
            onClick={() => {
              setLogoAnimation(true);
            }}
          >
            LockedIn
          </Link>
        </div>
        <nav className="w-full h-full justify-between items-center hidden md:flex">
          <Link
            className="font-semibold text-gray-600  hover:underline"
            href="/faq"
          >
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
