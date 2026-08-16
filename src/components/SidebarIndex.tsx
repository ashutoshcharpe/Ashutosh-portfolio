"use client";

import React from "react";

interface SidebarIndexProps {
  activeSection: string;
  isHidden?: boolean;
}

export default function SidebarIndex({ activeSection, isHidden = false }: SidebarIndexProps) {
  const sections = [
    { num: "01", name: "PORTFOLIO", id: "portfolio" },
    { num: "02", name: "ABOUT", id: "about" },
    { num: "03", name: "EXPERIENCE", id: "experience" },
    { num: "04", name: "WORK", id: "work" },
    { num: "05", name: "SERVICES", id: "services" },
    { num: "06", name: "CONTACT", id: "contact" },
  ];

  return (
    <>
      {/* Left side fixed index numbers */}
      <aside
        className={`fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col space-y-5 text-[10px] font-bold tracking-widest pointer-events-auto select-none transition-all duration-500 ease-in-out ${
          isHidden ? "-translate-x-20 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
      >
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={`flex items-center space-x-3 transition-all duration-300 group ${
                isActive ? "text-slate-900 scale-105" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <span className={`transition-colors ${isActive ? "text-slate-950 font-black text-[12px]" : ""}`}>
                {sec.num}
              </span>
              <div
                className={`transition-all duration-300 ${
                  isActive
                    ? "w-6 h-[1.5px] bg-slate-900"
                    : "w-2.5 h-[1px] bg-slate-300 group-hover:w-4 group-hover:bg-slate-500"
                }`}
              />
              <span className={`uppercase text-[9px] ${isActive ? "opacity-100 font-extrabold text-slate-950" : "opacity-60"}`}>
                {sec.name}
              </span>
            </a>
          );
        })}
      </aside>

      {/* Bottom left scroll indicator */}
      <div className="fixed left-6 lg:left-10 bottom-8 z-40 hidden md:flex items-center space-x-3 text-[10px] tracking-widest text-slate-500 font-semibold select-none pointer-events-none">
        <div className="w-4 h-7 border border-slate-400/80 rounded-full flex items-start justify-center p-1 shadow-sm">
          <div className="w-1 h-2 bg-slate-700 rounded-full animate-bounce"></div>
        </div>
        <span className="uppercase text-[9px] text-slate-600 tracking-wider">SCROLL TO EXPLORE</span>
      </div>
    </>
  );
}
