"use client";

import React from "react";
import { Film, Sparkles, Layers, Sliders, ArrowUpRight } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Cinematic Video Editing",
      icon: <Film className="w-6 h-6 text-indigo-600" />,
      desc: "Dynamic narrative flow, seamless transitions, precision cuts, and immersive soundscapes tailored for films & commercials.",
      tags: ["Premiere Pro", "4K Mastering", "Pacing"],
    },
    {
      title: "Motion Graphics & 3D",
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      desc: "Eye-catching title cards, 3D kinetic typography, animated intros, and high-impact visual effects that elevate brands.",
      tags: ["After Effects", "Kinetic Type", "VFX"],
    },
    {
      title: "Color Grading & LUTs",
      icon: <Sliders className="w-6 h-6 text-cyan-600" />,
      desc: "Professional color grading in DaVinci Resolve with film emulation, skin-tone isolation, and cinematic moods.",
      tags: ["DaVinci Resolve", "Color Wheels", "Film LUTs"],
    },
    {
      title: "High-Retention Short Form",
      icon: <Layers className="w-6 h-6 text-rose-600" />,
      desc: "Fast-paced YouTube Shorts, TikToks, and Instagram Reels optimized with sound hooks and visual engagement.",
      tags: ["CapCut", "Viral Pacing", "Captions"],
    },
  ];

  return (
    <section id="services" className="relative py-20 px-6 sm:px-10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 mb-3">
            <span className="text-[11px] font-extrabold tracking-[0.25em] text-indigo-600 uppercase">
              SERVICES
            </span>
            <div className="w-6 h-[1.5px] bg-indigo-500/60 rounded-full" />
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-serif">
            What I Bring To The <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Table</span>.
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 group shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white/90 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {service.desc}
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-slate-200/60 mt-6">
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/60 text-[10px] font-mono font-semibold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
