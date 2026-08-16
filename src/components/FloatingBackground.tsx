"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function FloatingBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic Ambient Background Glow Orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-indigo-300/30 blur-[120px] -top-40 -left-20 animate-pulse-glow"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-300/25 blur-[100px] top-1/3 -right-20 animate-pulse-glow"
        style={{
          animationDelay: "2s",
          transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
        }}
      />
      <div
        className="absolute w-[700px] h-[700px] rounded-full bg-blue-200/30 blur-[130px] bottom-10 left-1/4 animate-pulse-glow"
        style={{
          animationDelay: "4s",
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
        }}
      />

      {/* Floating 3D Graphic Elements & UI Panels */}

      {/* Hero Right Floating Color Grading Wheels Panel */}
      <div
        className="absolute top-[8%] right-[42%] lg:right-[38%] hidden md:block transition-all duration-700 ease-out animate-float-slow opacity-40 hover:opacity-75"
        style={{
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) rotate(-6deg)`,
        }}
      >
        <div className="p-3.5 rounded-2xl bg-slate-900/40 text-white backdrop-blur-md border border-white/30 shadow-lg w-48 scale-90">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-mono tracking-wider text-slate-300">COLOR BALANCE</span>
            <div className="flex space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/60"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/60"></span>
            </div>
          </div>
          <div className="flex justify-around items-center py-1">
            {/* Color Wheel 1 */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-amber-500 p-[1.5px] shadow-inner opacity-75">
              <div className="w-full h-full rounded-full bg-slate-950/70 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
              </div>
            </div>
            {/* Color Wheel 2 */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 via-pink-500 to-rose-500 p-[1.5px] shadow-inner opacity-75">
              <div className="w-full h-full rounded-full bg-slate-950/70 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]"></div>
              </div>
            </div>
            {/* Color Wheel 3 */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 via-blue-500 to-violet-500 p-[1.5px] shadow-inner opacity-75">
              <div className="w-full h-full rounded-full bg-slate-950/70 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
              </div>
            </div>
          </div>
          <div className="mt-2 text-[8px] font-mono text-indigo-200 flex justify-between">
            <span>LUT: CINEMA_TEAL_ORANGE</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Floating Video Editor Timeline Scrubber Panel (Top Right) */}
      <div
        className="absolute top-[18%] right-[4%] lg:right-[8%] hidden lg:block transition-all duration-700 ease-out animate-float-reverse opacity-40 hover:opacity-75"
        style={{
          transform: `translate(${mousePos.x * -28}px, ${mousePos.y * -28}px) rotate(8deg)`,
        }}
      >
        <div className="p-3 rounded-xl bg-slate-950/40 text-white backdrop-blur-md border border-indigo-400/20 shadow-lg w-56">
          <div className="flex items-center justify-between text-[8px] font-mono text-slate-300 mb-1.5">
            <span className="text-indigo-300 font-bold">TIMELINE • V1/A2</span>
            <span>00:02:44:12</span>
          </div>
          {/* Tracks */}
          <div className="space-y-1">
            <div className="h-2 rounded bg-indigo-600/50 w-full flex items-center px-1">
              <div className="h-1 w-1/3 bg-indigo-400/70 rounded-sm"></div>
            </div>
            <div className="h-2 rounded bg-purple-600/40 w-3/4 flex items-center px-1">
              <div className="h-1 w-1/2 bg-purple-300/70 rounded-sm"></div>
            </div>
            <div className="h-2.5 rounded bg-emerald-600/50 w-5/6 flex items-center justify-around px-1">
              <div className="h-1.5 w-full bg-emerald-400/60 rounded-sm flex items-center space-x-0.5 px-0.5">
                <span className="w-0.5 h-1 bg-white inline-block"></span>
                <span className="w-0.5 h-1.5 bg-white inline-block"></span>
                <span className="w-0.5 h-1 bg-white inline-block"></span>
                <span className="w-0.5 h-1.5 bg-white inline-block"></span>
                <span className="w-0.5 h-1 bg-white inline-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Premiere Pro (Pr) Glass Badge */}
      <div
        className="absolute top-[22%] left-[34%] md:left-[38%] transition-all duration-700 ease-out animate-float-slow opacity-45 hover:opacity-80"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px) rotate(-12deg)`,
        }}
      >
        <div className="w-11 h-11 rounded-2xl bg-indigo-950/40 backdrop-blur-md border border-indigo-400/30 shadow-lg p-1.5 flex items-center justify-center">
          <Image
            src="/images/pr_icon.png"
            alt="Premiere Pro"
            width={38}
            height={38}
            className="w-full h-full object-contain drop-shadow-sm rounded-lg opacity-85"
          />
        </div>
      </div>

      {/* Floating After Effects (Ae) Glass Badge */}
      <div
        className="absolute top-[48%] right-[8%] lg:right-[15%] transition-all duration-700 ease-out animate-float-reverse opacity-45 hover:opacity-80"
        style={{
          transform: `translate(${mousePos.x * -22}px, ${mousePos.y * -22}px) rotate(14deg)`,
        }}
      >
        <div className="w-12 h-12 rounded-2xl bg-[#090b14]/45 backdrop-blur-md border border-purple-400/30 shadow-lg p-1.5 flex items-center justify-center">
          <Image
            src="/images/ae_icon.png"
            alt="After Effects"
            width={40}
            height={40}
            className="w-full h-full object-contain drop-shadow-sm rounded-lg opacity-85"
          />
        </div>
      </div>

      {/* Floating 3D Crystal Diamonds */}
      <div
        className="absolute top-[28%] right-[22%] w-6 h-6 rotate-45 bg-gradient-to-br from-white/70 to-indigo-200/30 backdrop-blur-sm border border-white/60 shadow-md animate-float-gentle opacity-40"
        style={{
          transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px) rotate(45deg)`,
        }}
      />
      <div
        className="absolute top-[65%] left-[10%] w-5 h-5 rotate-12 bg-gradient-to-br from-white/70 to-purple-200/30 backdrop-blur-sm border border-white/60 shadow-sm animate-float-slow opacity-35"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) rotate(25deg)`,
        }}
      />
      <div
        className="absolute bottom-[20%] right-[12%] w-7 h-7 rotate-45 bg-gradient-to-br from-white/75 to-blue-200/35 backdrop-blur-sm border border-white/70 shadow-md animate-float-reverse opacity-40"
        style={{
          transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 18}px) rotate(45deg)`,
        }}
      />

      {/* Floating Audio Spectrogram UI Box in Experience area */}
      <div
        className="absolute top-[68%] right-[32%] hidden lg:block transition-all duration-700 ease-out animate-float-slow opacity-35 hover:opacity-70"
        style={{
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px) rotate(-8deg)`,
        }}
      >
        <div className="p-2.5 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/20 shadow-md w-36">
          <div className="text-[7px] font-mono text-slate-300 mb-1">AUDIO GAIN • +2.4dB</div>
          <div className="flex items-end space-x-1 h-6">
            {[40, 75, 90, 60, 30, 85, 95, 70, 50, 65, 80, 45].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-t-sm bg-gradient-to-t from-indigo-500/70 to-purple-400/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
