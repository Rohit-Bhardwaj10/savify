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
    <nav className="sticky top-0 z-50 glass border-b border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0 group"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 md:w-9 md:h-9 bg-zinc-100 rounded-lg flex items-center justify-center border border-zinc-200 group-hover:scale-105 transition-all duration-300">
                <span className="text-zinc-950 font-black text-xs md:text-sm">
                  S
                </span>
              </div>
              <span className="text-sm md:text-base font-black tracking-widest text-white uppercase">
                SAVIFY <span className="text-zinc-600 font-bold">CORE</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {["Home", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-zinc-500 hover:text-white px-4 py-2 text-[10px] uppercase font-mono font-black tracking-[0.2em] transition-all duration-300 hover:bg-zinc-900 rounded-lg group"
              >
                <span className="group-hover:text-zinc-400 mr-2 opacity-50">/</span>
                {item}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Authentication - Desktop */}
            <div className="hidden sm:block">
              <SignedOut>
                <SignInButton>
                  <button className="bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white active:scale-95 transition-all">
                    Initialize
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="p-1 px-1 rounded-xl glass-lighter border border-zinc-800/30">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-7 h-7 rounded-lg",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-zinc-500 hover:text-white transition-all active:scale-95"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1">
                <div className={`w-5 h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <div className={`w-5 h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-5 h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"}`}
        >
          <div className="px-3 pt-3 pb-4 space-y-1 bg-black/90 backdrop-blur-xl rounded-2xl border border-zinc-900 shadow-2xl">
            {["Home", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="flex items-center px-4 py-3 text-zinc-500 hover:text-white text-[10px] font-mono font-black uppercase tracking-widest transition-all"
                onClick={closeMobileMenu}
              >
                <span className="mr-3 opacity-30">{'>'}</span>
                {item}
              </Link>
            ))}

            <div className="pt-3 border-t border-zinc-900">
              <SignedOut>
                <SignInButton>
                  <button className="w-full bg-zinc-100 text-zinc-950 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    Initialize Session
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center p-3">
                  <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
