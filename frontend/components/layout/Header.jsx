import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../ui/Button";

const Header = () => {
  const router = useRouter();
  return (
    <header className="sticky left-0 top-0 z-50 h-20 w-full justify-center bg-[#ffffffb8] backdrop-blur-[20px] backdrop-saturate-[180%]">
      <div className="m-auto flex h-full w-full max-w-screen-xl justify-between px-6 sm:px-16">
        {/* 1280px */}
        <div className="w-full items-center flex">
          <Link className={`text-black text-xl font-bold`} href="/">
            LockedIn
          </Link>
        </div>
        <nav className="w-full h-full justify-between items-center hidden md:flex">
          <Link
            className="font-semibold text-gray-600 text-sm hover:underline"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </nav>
        <span className="flex h-full items-center">
          <Button onClick={() => router.push("/login")}>Login</Button>
        </span>
      </div>
    </header>
  );
};

export default Header;
