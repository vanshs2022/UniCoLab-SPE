"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import userAuthStatus from "@/utils/authStatus";
import { logoutUser } from "../../../utils/logout";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    userAuthStatus().then(({ email, authenticated }) => {
      if (!authenticated) setIsloggedIn(false);
      else {
        setIsloggedIn(true);
        setEmail(email);
      }
    });

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        !(event.target as HTMLElement).closest(".mobile-menu-container")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-gradient-to-r from-[#080D29] to-[#102042] backdrop-blur-md shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <img
                className="h-[180px] w-[180px] transition-transform group-hover:scale-105"
                src="/logo.png"
                alt="UniCoLab"
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" name="Home" />
            <NavLink href="/explore/profile/edit" name="Create Profile" />
            <NavLink href="#mission" name="About Us" />
            <NavLink href="#contact" name="Contact Us" />
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  className="text-white hover:text-indigo-300 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={() => { logoutUser(); setIsloggedIn(false); }}
                className="text-white hover:text-indigo-300 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                Log Out
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mobile-menu-container transition-all duration-300 ease-in-out fixed left-0 top-16 w-full z-[105] ${
          isMobileMenuOpen
            ? "max-h-[80vh] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-[#0A1032] border-t border-white/10 shadow-lg px-4 py-3 space-y-2 max-h-[80vh] overflow-y-auto">
          <MobileNavLink href="/" name="Home" />
          <MobileNavLink href="/explore/profile/edit" name="Create Profile" />
          <MobileNavLink href="#mission" name="About Us" />
          <MobileNavLink href="#contact" name="Contact Us" />
          <div className="border-t border-white/10 my-3"></div>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col space-y-3 py-2">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  className="w-full text-center px-4 py-4 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors text-lg"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="w-full text-center px-4 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors text-lg"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={logoutUser}
                className="w-full text-center px-4 py-4 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors text-lg"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable desktop link
const NavLink = ({ href, name }: { href: string; name: string }) => (
  <Link
    href={href}
    className="px-3 py-2 rounded-lg font-medium text-white hover:bg-white/10 hover:text-indigo-300 transition-colors"
  >
    {name}
  </Link>
);

// Reusable mobile link
const MobileNavLink = ({ href, name }: { href: string; name: string }) => (
  <Link
    href={href}
    className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors text-lg"
  >
    {name}
  </Link>
);

export default Navbar;
