"use client";

import React from "react";
import Image from "next/image";

export default function ExperienceSection() {
  const experiences = [
    {
      year: "2025",
      agency: "Wefore Media",
      role: "Video Editor",
      description: "Edited cafe reels, promotion reels and social media content.",
    },
    {
      year: "2026",
      agency: "Creative Design Studio",
      role: " Motion Graphics Video Editor",
      description:
        "Edited instagram reels, youtube shorts and promotional reels.",
    },
    {
      year: "2025-Present",
      agency: "College Social Media Team",
      role: "Video Editor",
      description:
        "Edited College Events Reels.",
    },

  ];

  return (
    <section id="experience" className="relative py-20 px-6 sm:px-10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Glass Card Container */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-8">
              {/* Tag */}
              <div className="inline-flex items-center space-x-2">
                <span className="text-[11px] font-extrabold tracking-[0.25em] text-indigo-600 uppercase">
                  EXPERIENCE
                </span>
                <div className="w-6 h-[1.5px] bg-indigo-500/60 rounded-full" />
              </div>

              {/* Headline */}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-serif leading-[1.15]">
                Every Project, <br />
                Every <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Story</span>.
              </h3>

              {/* Timeline Tree */}
              <div className="relative pl-2 sm:pl-4 space-y-8 w-full">
                {/* Vertical continuous line */}
                <div className="absolute left-[39px] sm:left-[47px] top-4 bottom-4 w-[2px] bg-indigo-300/60" />

                {experiences.map((exp, index) => (
                  <div key={index} className="relative flex items-start space-x-4 sm:space-x-6 group">
                    {/* Year pill */}
                    <div className="w-8 sm:w-10 text-[11px] font-mono font-bold text-indigo-600 pt-0.5 text-right">
                      {exp.year}
                    </div>

                    {/* Timeline Node Dot */}
                    <div className="relative z-10 w-4 h-4 rounded-full bg-indigo-600 border-[3px] border-white shadow-md mt-0.5 group-hover:scale-125 transition-transform flex-shrink-0" />

                    {/* Agency & Description */}
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {exp.agency}
                        </h4>
                        <span className="text-xs font-semibold text-indigo-500 font-mono">
                          &bull; {exp.role}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Column: 3D Metal Film Reel & Floating Accents */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              {/* Spooled Metal Film Reel */}
              <div className="relative w-full max-w-md animate-float-slow transition-transform hover:scale-105 duration-500 cursor-pointer">
                <div className="relative rounded-3xl p-2 bg-gradient-to-b from-white/20 to-transparent">
                  <Image
                    src="/images/film_reel.jpg"
                    alt="3D Metal Movie Film Reel Spool"
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain drop-shadow-[0_25px_40px_rgba(99,102,241,0.25)] rounded-2xl"
                  />
                </div>
              </div>

              {/* Floating Ae Glass Badge on top left of reel */}
              <div className="absolute top-4 left-6 w-12 h-12 rounded-xl bg-slate-950/80 backdrop-blur-md border border-purple-400/40 shadow-xl flex items-center justify-center text-purple-400 font-black text-xs animate-float-gentle hidden sm:flex">
                Ae
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
