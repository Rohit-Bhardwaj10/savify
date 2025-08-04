"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black backdrop-blur-2xl border-b border-gray-700/50 dark:border-gray-600/50 shadow-2xl shadow-black/20 dark:shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group transition-all duration-300 hover:scale-105"
              onClick={closeMobileMenu}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <span className="text-white text-xs sm:text-sm md:text-lg font-bold">
                  💰
                </span>
              </div>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                <span className="hidden sm:inline">Savify</span>
                <span className="sm:hidden">Savify</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="relative text-gray-300 hover:text-emerald-400 px-4 lg:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-800/50 backdrop-blur-sm group border border-transparent hover:border-gray-600/50"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </Link>

            <Link
              href="/about"
              className="relative text-gray-300 hover:text-emerald-400 px-4 lg:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-800/50 backdrop-blur-sm group border border-transparent hover:border-gray-600/50"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </Link>

            <Link
              href="/contact"
              className="relative text-gray-300 hover:text-emerald-400 px-4 lg:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-800/50 backdrop-blur-sm group border border-transparent hover:border-gray-600/50"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Theme Toggle */}

            {/* Authentication - Desktop */}
            <div className="hidden sm:block">
              <SignedOut>
                <SignInButton>
                  <button className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                    <div className="relative z-10 flex items-center gap-1 sm:gap-2">
                      <span>Sign In</span>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="p-0.5 sm:p-1 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-100/50 to-green-100/50 dark:from-emerald-900/20 dark:to-green-900/20 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform duration-200",
                        userButtonBox: "flex items-center justify-center",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 sm:p-2.5 rounded-xl text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 active:scale-95 border border-transparent hover:border-gray-600/50"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen
            ? "max-h-96 opacity-100 pb-4 sm:pb-5"
            : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <div className="px-3 pt-3 pb-4 space-y-2 bg-gray-800/50 backdrop-blur-2xl rounded-2xl border border-gray-600/50 mt-3 shadow-2xl shadow-black/50">
            {/* Mobile Navigation Links */}
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 backdrop-blur-sm text-sm font-medium transition-all duration-300 active:scale-95 border border-transparent hover:border-gray-500/50"
              onClick={closeMobileMenu}
            >
              <span className="text-base">🏠</span>
              <span>Home</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 backdrop-blur-sm text-sm font-medium transition-all duration-300 active:scale-95 border border-transparent hover:border-gray-500/50"
              onClick={closeMobileMenu}
            >
              <span className="text-base">ℹ️</span>
              <span>About</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 backdrop-blur-sm text-sm font-medium transition-all duration-300 active:scale-95 border border-transparent hover:border-gray-500/50"
              onClick={closeMobileMenu}
            >
              <span className="text-base">📞</span>
              <span>Contact</span>
            </Link>

            {/* Mobile Authentication */}
            <div className="pt-3 border-t border-gray-600/50">
              <SignedOut>
                <SignInButton>
                  <button
                    className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                    onClick={closeMobileMenu}
                  >
                    <span>Sign In</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-emerald-100/50 to-green-100/50 dark:from-emerald-900/20 dark:to-green-900/20 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-8 h-8 hover:scale-110 transition-transform duration-200",
                        userButtonBox: "flex items-center justify-center",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
