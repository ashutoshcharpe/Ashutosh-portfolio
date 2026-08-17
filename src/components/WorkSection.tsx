"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, ArrowUpRight, Volume2, Film, Sparkles } from "lucide-react";
import VideoModal from "./VideoModal";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  frameNumber: string;
  image: string;
  driveId: string;
  driveUrl: string;
  driveEmbedUrl: string;
  isVertical?: boolean;
  videoUrl?: string;
  duration: string;
  description: string;
  software: string[];
}

interface WorkSectionProps {
  onModalOpenChange?: (isOpen: boolean) => void;
}

export default function WorkSection({ onModalOpenChange }: WorkSectionProps = {}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    onModalOpenChange?.(true);
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
    onModalOpenChange?.(false);
  };

  const projects: ProjectItem[] = [
    {
      id: "project-1",
      title: "Alive Clinic Commercial",
      category: "Brand & Healthcare Reel",
      frameNumber: "01A",
      image: "https://drive.google.com/thumbnail?id=1P3DJXC2nay0BF8cT8W0rCrIltclDfg8G&sz=w1000",
      driveId: "1P3DJXC2nay0BF8cT8W0rCrIltclDfg8G",
      driveUrl: "https://drive.google.com/file/d/1P3DJXC2nay0BF8cT8W0rCrIltclDfg8G/view?usp=drivesdk",
      driveEmbedUrl: "https://drive.google.com/file/d/1P3DJXC2nay0BF8cT8W0rCrIltclDfg8G/preview",
      isVertical: true,
      duration: "00:45",
      description:
        "Dynamic commercial edit for Alive Clinic featuring clean pacing, sleek subtitle motion graphics, clinical color grading, and ambient sound design.",
      software: ["Capcut", "Premiere Pro"],
    },
    {
      id: "project-2",
      title: "DISCO Motion Reel",
      category: "Music & Nightlife Promo",
      frameNumber: "02A",
      image: "https://drive.google.com/thumbnail?id=1Q4F66KmR6eMMuPKBz70okPKVCozAW9eu&sz=w1000",
      driveId: "1Q4F66KmR6eMMuPKBz70okPKVCozAW9eu",
      driveUrl: "https://drive.google.com/file/d/1Q4F66KmR6eMMuPKBz70okPKVCozAW9eu/view?usp=drivesdk",
      driveEmbedUrl: "https://drive.google.com/file/d/1Q4F66KmR6eMMuPKBz70okPKVCozAW9eu/preview",
      isVertical: false,
      duration: "00:30",
      description:
        "High-energy rhythmic cutting synced to dynamic disco beats, neon glow color grading, speed ramping, and stylized glitch transitions.",
      software: ["Premiere Pro", "After Effects", "CapCut"],
    },
    {
      id: "project-3",
      title: "Podcast Highlights Reel",
      category: "Short-form & Socials",
      frameNumber: "03A",
      image: "https://drive.google.com/thumbnail?id=1if6wKjfYn00uBPwKrwV20V0CCynN0qYy&sz=w1000",
      driveId: "1if6wKjfYn00uBPwKrwV20V0CCynN0qYy",
      driveUrl: "https://drive.google.com/file/d/1if6wKjfYn00uBPwKrwV20V0CCynN0qYy/view?usp=drivesdk",
      driveEmbedUrl: "https://drive.google.com/file/d/1if6wKjfYn00uBPwKrwV20V0CCynN0qYy/preview",
      isVertical: true,
      duration: "01:00",
      description:
        "Engaging short-form podcast edit with animated captions, dynamic camera reframing, sound effects, B-roll overlays, and crisp audio enhancement.",
      software: ["Premiere Pro", "CapCut", "Audition"],
    },
    {
      id: "project-4",
      title: "Rap Battle Cypher",
      category: "Event & Music Video",
      frameNumber: "04A",
      image: "https://drive.google.com/thumbnail?id=1vlnI-3o5WiFeLNdF_Zxn8oDSUSSnqfXh&sz=w1000",
      driveId: "1vlnI-3o5WiFeLNdF_Zxn8oDSUSSnqfXh",
      driveUrl: "https://drive.google.com/file/d/1vlnI-3o5WiFeLNdF_Zxn8oDSUSSnqfXh/view?usp=drivesdk",
      driveEmbedUrl: "https://drive.google.com/file/d/1vlnI-3o5WiFeLNdF_Zxn8oDSUSSnqfXh/preview",
      isVertical: false,
      duration: "00:50",
      description:
        "Intense, rhythm-matched rap battle edit with fast cuts, camera whip transitions, bass drops, and crowd energy sound mix.",
      software: ["Premiere Pro", "Capcut", "DaVinci Resolve"],
    },
    {
      id: "project-5",
      title: "Treat Studio Showcase",
      category: "Studio & Brand Promo",
      frameNumber: "05A",
      image: "https://drive.google.com/thumbnail?id=1ZA6bh79wOBFksKmygfo9Dd01Bnn3FxA5&sz=w1000",
      driveId: "1ZA6bh79wOBFksKmygfo9Dd01Bnn3FxA5",
      driveUrl: "https://drive.google.com/file/d/1ZA6bh79wOBFksKmygfo9Dd01Bnn3FxA5/view?usp=drivesdk",
      driveEmbedUrl: "https://drive.google.com/file/d/1ZA6bh79wOBFksKmygfo9Dd01Bnn3FxA5/preview",
      isVertical: true,
      duration: "00:35",
      description:
        "Creative studio commercial with slick pacing, modern typography, aesthetic color grading, and custom transition sound design.",
      software: ["Premiere Pro", "CapCut"],
    },
    {
      id: "project-6",
      title: "Woksmith Culinary Story",
      category: "Food & Restaurant Reel",
      frameNumber: "06A",
      image: "https://drive.google.com/thumbnail?id=14np_auxASma5o18QbixCvQZ94BJNzBQA&sz=w1000",
      driveId: "14np_auxASma5o18QbixCvQZ94BJNzBQA",
      driveUrl: "https://drive.google.com/file/d/14np_auxASma5o18QbixCvQZ94BJNzBQA/view?usp=drivesdk",
      driveEmbedUrl: "https://drive.google.com/file/d/14np_auxASma5o18QbixCvQZ94BJNzBQA/preview",
      isVertical: true,
      duration: "00:40",
      description:
        "Mouth-watering culinary reel featuring sizzling pan sound design, macro shot color grade, speed ramps, and appetite-inducing pacing.",
      software: ["Premiere Pro", "Capcut"],
    },
  ];

  // Duplicate for seamless infinite marquee loop
  const displayProjects = [...projects, ...projects];

  return (
    <section id="work" className="relative py-24 z-10 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="text-[11px] font-extrabold tracking-[0.25em] text-indigo-600 uppercase">
                MY WORK &bull; LIVE REEL
              </span>
              <div className="w-6 h-[1.5px] bg-indigo-500/60 rounded-full" />
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-serif">
              Crafting Visual <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Stories</span>.
            </h3>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/80 shadow-sm self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1" />
            <span>CONTINUOUS LOOP ACTIVE</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-indigo-600 font-semibold flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" /> Click video for Audio
            </span>
          </div>
        </div>
      </div>

      {/* 90s Vintage Film Roll Container */}
      <div className="relative w-full py-6 flex items-center overflow-x-hidden">


        {/* Film Strip Track Wrapper */}
        <div className="w-full overflow-hidden py-4">
          <div className="animate-film-scroll flex space-x-0 items-center">
            {displayProjects.map((project, idx) => {
              const originalIndex = idx % projects.length;
              return (
                <div
                  key={`${project.id}-${idx}`}
                  onClick={() => handleOpenModal(originalIndex)}
                  className="group relative cursor-pointer flex-shrink-0 bg-[#0b0d14] text-white p-3 sm:p-4 rounded-xl shadow-2xl border-y-[6px] border-x-[3px] border-[#181b28] hover:border-indigo-500/60 hover:scale-[1.03] transition-all duration-300 mx-2"
                  style={{ width: "330px" }}
                >
                  {/* Top Film Sprocket Strip */}
                  <div className="w-full h-5 flex items-center justify-between px-1 mb-2 border-b border-white/10 opacity-75">
                    <div className="flex space-x-2">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3.5 h-2.5 rounded-[2px] bg-white/80 shadow-inner"
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono tracking-widest text-amber-400/90 font-bold">
                      KODAK 400 &bull; {project.frameNumber}
                    </span>
                    <div className="flex space-x-2">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3.5 h-2.5 rounded-[2px] bg-white/80 shadow-inner"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Main Video Frame Preview: Optimized Video */}
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-950 border border-white/10 group-hover:border-indigo-400/40 transition-colors">
                    {/* Background Preview Video (Google Drive preview iframe or fallback) */}
                    {project.driveEmbedUrl ? (
                      <div className="w-full h-full relative overflow-hidden pointer-events-none">
                        <iframe
                          src={project.driveEmbedUrl}
                          title={project.title}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          className="absolute inset-0 w-[140%] h-[140%] -left-[20%] -top-[20%] object-cover pointer-events-none brightness-95 group-hover:scale-105 group-hover:brightness-110 transition-all duration-500 border-0"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <video
                        src={selectedIndex === null ? project.videoUrl : undefined}
                        poster={project.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover brightness-95 group-hover:scale-105 group-hover:brightness-110 transition-all duration-500"
                      />
                    )}

                    {/* Live Stream / Muted Status Pill */}
                    <div className="absolute top-2 left-2 flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[9px] font-mono text-slate-200 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{project.isVertical ? "9:16 REEL" : "HD REEL"}</span>
                    </div>

                    {/* Sound Indicator Overlay on Hover */}
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center pointer-events-none">
                      <div className="w-13 h-13 rounded-full bg-indigo-600/90 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-indigo-500 transition-all duration-300">
                        <Play className="w-6 h-6 ml-0.5 fill-white text-white" />
                      </div>
                    </div>

                    {/* Bottom Sound Badge / Duration */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <span className="px-2 py-0.5 rounded bg-indigo-950/80 backdrop-blur-md border border-indigo-400/30 text-[9px] font-mono font-bold text-indigo-200 flex items-center space-x-1">
                        <Volume2 className="w-3 h-3 text-indigo-400" />
                        <span>CLICK FOR AUDIO</span>
                      </span>

                      <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-mono font-bold text-white">
                        {project.duration}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Film Sprocket Strip */}
                  <div className="w-full h-5 flex items-center justify-between px-1 mt-2 border-t border-white/10 opacity-75">
                    <div className="flex space-x-2">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3.5 h-2.5 rounded-[2px] bg-white/80 shadow-inner"
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono tracking-widest text-slate-400 font-bold">
                      SAFETY FILM &bull; 24FPS
                    </span>
                    <div className="flex space-x-2">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3.5 h-2.5 rounded-[2px] bg-white/80 shadow-inner"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Project Title & Category Info */}
                  <div className="mt-2.5 px-1 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-indigo-400 transition-colors truncate max-w-[200px]">
                        {project.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                        {project.category}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      PLAY &bull; AUDIO &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* View All Work Button */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 mt-8 flex justify-center">
        <button
          onClick={() => handleOpenModal(0)}
          className="dark-pill-btn px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center space-x-2 group cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-indigo-400" />
          <span>PLAY FULL SHOWCASE WITH SOUND</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Video Modal Lightbox with Audio Playback */}
      {selectedIndex !== null && (
        <VideoModal
          project={projects[selectedIndex]}
          projects={projects}
          currentIndex={selectedIndex}
          onSelectProject={(index) => setSelectedIndex(index)}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
