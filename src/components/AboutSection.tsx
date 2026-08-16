"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadCV = () => {
    setDownloaded(true);
    // Create simulated or real resume download trigger
    const link = document.createElement("a");
    link.href = "#";
    link.download = "Ashu_Video_Editor_Resume.pdf";
    setTimeout(() => setDownloaded(false), 3000);
  };

  const softwareList = [
    {
      name: "After Effects",
      category: "VFX & Motion",
      icon: (
        <div className="w-11 h-11 relative rounded-xl overflow-hidden shadow-md group-hover:scale-110 transition-transform">
          <Image
            src="/images/ae_icon.png"
            alt="Adobe After Effects"
            width={44}
            height={44}
            className="w-full h-full object-contain"
          />
        </div>
      ),
    },
    {
      name: "Premiere Pro",
      category: "Cinematic Editing",
      icon: (
        <div className="w-11 h-11 relative rounded-xl overflow-hidden shadow-md group-hover:scale-110 transition-transform">
          <Image
            src="/images/pr_icon.png"
            alt="Adobe Premiere Pro"
            width={44}
            height={44}
            className="w-full h-full object-contain"
          />
        </div>
      ),
    },
    {
      name: "DaVinci Resolve",
      category: "Color & Post",
      icon: (
        <div className="w-11 h-11 relative rounded-xl overflow-hidden shadow-md group-hover:scale-110 transition-transform">
          <Image
            src="/images/davinci_icon.png"
            alt="DaVinci Resolve"
            width={44}
            height={44}
            className="w-full h-full object-contain"
          />
        </div>
      ),
    },
    {
      name: "CapCut",
      category: "Short-form & Reels",
      icon: (
        <div className="w-11 h-11 relative rounded-xl overflow-hidden shadow-md group-hover:scale-110 transition-transform">
          <Image
            src="/images/capcut_icon.png"
            alt="CapCut"
            width={44}
            height={44}
            className="w-full h-full object-contain"
          />
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="relative py-20 px-6 sm:px-10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Glass Card Container */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-6">
              {/* Tag */}
              <div className="inline-flex items-center space-x-2">
                <span className="text-[11px] font-extrabold tracking-[0.25em] text-indigo-600 uppercase">
                  ABOUT ME
                </span>
                <div className="w-6 h-[1.5px] bg-indigo-500/60 rounded-full" />
              </div>

              {/* Headline */}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-serif leading-[1.15]">
                I don&apos;t just edit videos, <br />
                I tell <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">stories</span>.
              </h3>

              {/* Body text */}
              <div className="space-y-3 text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                <p>
                  I’m a passionate <b>Video Editor and Visual Storyteller</b> focused on creating engaging, cinematic, and impactful content. I work with <b>reels, podcasts, social media videos, motion graphics, and creative edits</b>, combining clean editing with strong visuals and sound.
                </p>
                <p>
                  I believe every video has a story—and my job is to make it worth watching.
                </p>
              </div>


              {/* Software I Use */}
              <div className="w-full pt-4 space-y-3">
                <div className="text-[10px] font-extrabold tracking-[0.2em] text-slate-500 uppercase">
                  SOFTWARE I USE
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
                  {softwareList.map((item) => (
                    <div
                      key={item.name}
                      className="glass-pill p-3 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 hover:scale-105 transition-transform group cursor-pointer"
                    >
                      {item.icon}
                      <span className="text-[11px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              {/* Main Rounded Portrait */}
              <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 group">
                <div className="aspect-[4/5] relative bg-slate-900">
                  <Image
                    src="/images/ashu.png"
                    alt="Ashu - Video Editor & Motion Designer"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Clapperboard Asset on Top Right */}
              <div className="absolute -top-8 -right-6 sm:-right-8 w-28 sm:w-32 animate-float-slow hidden sm:block">
                <Image
                  src="/images/clapperboard.png"
                  alt="3D Cinema Clapperboard"
                  width={200}
                  height={200}
                  className="w-full h-auto drop-shadow-xl rounded-2xl mix-blend-multiply opacity-90"
                />
              </div>

              {/* Floating 3D Purple Scissors on Bottom Right */}
              <div className="absolute -bottom-10 -right-4 sm:-right-6 w-32 sm:w-40 animate-float-reverse hidden sm:block">
                <Image
                  src="/images/scissors.png"
                  alt="3D Lavender Editing Scissors"
                  width={250}
                  height={250}
                  className="w-full h-auto drop-shadow-2xl mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
