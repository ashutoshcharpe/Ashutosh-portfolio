"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  isHidden?: boolean;
}

export default function Navbar({ activeSection, isHidden = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "PORTFOLIO", href: "#portfolio", id: "portfolio" },
    { name: "ABOUT", href: "#about", id: "about" },
    { name: "EXPERIENCE", href: "#experience", id: "experience" },
    { name: "WORK", href: "#work", id: "work" },
    { name: "SERVICES", href: "#services", id: "services" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isHidden
          ? "-translate-y-full opacity-0 pointer-events-none"
          : isScrolled
          ? "translate-y-0 py-3 bg-white/40 backdrop-blur-xl border-b border-white/60 shadow-sm"
          : "translate-y-0 py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#portfolio"
          className="group flex items-center text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900"
        >
          <span className="tracking-widest font-serif font-black">PORTFOLIO</span>
          <span className="w-2 h-2 rounded-full bg-indigo-600 ml-1 inline-block group-hover:scale-125 transition-transform"></span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-10 text-[11px] font-semibold tracking-widest text-slate-700">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative py-1 hover:text-slate-950 transition-colors uppercase flex flex-col items-center group ${isActive ? "text-slate-950 font-bold" : "text-slate-600"
                  }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 absolute -bottom-1.5 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
                )}
                <span className="w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-1.5"></span>
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="dark-pill-btn px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-1.5 uppercase transition-all"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/70 backdrop-blur-md text-slate-800 border border-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 mt-2 mx-4 rounded-2xl glass-card border border-white/80 shadow-2xl flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold tracking-widest text-slate-800 hover:text-indigo-600 py-1 flex items-center justify-between"
            >
              <span>{item.name}</span>
              {activeSection === item.id && (
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="dark-pill-btn text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider block mt-2"
          >
            LET&apos;S TALK &rarr;
          </a>
        </div>
      )}
    </header>
  );
}
