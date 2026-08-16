"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="portfolio"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 px-6 sm:px-10 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Hero Left Content */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start space-y-6 pt-4 lg:pt-0">
          {/* Welcome Tag */}
          <div className="inline-flex items-center space-x-2">
            <span className="text-[11px] font-extrabold tracking-[0.25em] text-indigo-600 uppercase">
              WELCOME TO MY WORLD
            </span>
            <div className="w-8 h-[1.5px] bg-indigo-500/60 rounded-full" />
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black tracking-tight text-slate-950 font-serif leading-none">
              PORTFOLIO
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
              VIDEO EDITOR <br className="hidden sm:inline" />
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 max-w-md font-medium leading-relaxed">
            I transform ideas into visual stories through editing, motion and creativity.
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href="#work"
              className="dark-pill-btn px-7 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center space-x-2 group"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Hero Right Visuals: Ashutosh with Camera & Ambient Glow */}
        <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center">
          {/* Glowing Backlight Ring */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-indigo-300/40 via-purple-300/50 to-blue-200/30 blur-2xl animate-pulse-glow" />

          {/* Main Photo Card */}
          <div className="relative z-10 w-full max-w-[420px] sm:max-w-[480px] animate-float-slow transition-transform hover:scale-105 duration-500 cursor-pointer">
            <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-white/60 to-white/20 backdrop-blur-xl border border-white/80 shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)] overflow-hidden">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src="/images/ashu_camera.jpg"
                  alt="Editor Ashutosh with Camera"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Micro Tag Overlay on Photo */}
            <div className="absolute -bottom-3 right-6 sm:right-8 glass-pill px-4 py-2 rounded-full text-xs font-bold text-slate-900 flex items-center space-x-2 shadow-xl border border-white/90">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="tracking-wide">Editor Ashutosh Charpe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Down Arrow Scroll to About */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#about"
          className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm animate-bounce"
          aria-label="Scroll down to About section"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
