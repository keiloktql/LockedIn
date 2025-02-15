import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} LockedIn. All rights reserved.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex space-x-6">
            <Link className="text-sm hover:text-slate-100" href="/about">
              About
            </Link>
            <Link className="text-sm hover:text-slate-100" href="/contact">
              Contact
            </Link>
            <Link className="text-sm hover:text-slate-100" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="text-sm hover:text-slate-100" href="/terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
