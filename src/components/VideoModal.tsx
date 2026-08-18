"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Radio,
  Smartphone,
  Tv,
  Sparkles,
  Volume2,
} from "lucide-react";
import { ProjectItem } from "./WorkSection";

interface VideoModalProps {
  project: ProjectItem;
  projects?: ProjectItem[];
  currentIndex?: number;
  onSelectProject?: (index: number) => void;
  onClose: () => void;
}

export default function VideoModal({
  project,
  projects = [],
  currentIndex = 0,
  onSelectProject,
  onClose,
}: VideoModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVertical = project.isVertical ?? false;

  // Lock background body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  // Keyboard Shortcuts (Esc, Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && projects.length > 1 && onSelectProject) {
        const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
        onSelectProject(prevIdx);
      } else if (e.key === "ArrowRight" && projects.length > 1 && onSelectProject) {
        const nextIdx = (currentIndex + 1) % projects.length;
        onSelectProject(nextIdx);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, currentIndex, projects.length, onSelectProject]);

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/95 backdrop-blur-2xl animate-fade-in select-none overscroll-contain overflow-hidden"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Background click to dismiss */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl cursor-pointer" onClick={onClose} />

      {/* Floating Top-Right Exit / Close Button (Always visible on all screens) */}
      <button
        onClick={onClose}
        className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[9999] flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-red-600/90 hover:bg-red-500 text-white text-xs font-bold font-mono tracking-wider shadow-2xl border border-white/30 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
        title="Close Video (Esc)"
        aria-label="Close modal"
      >
        <X className="w-4 h-4 text-white stroke-[2.5]" />
        <span className="hidden xs:inline">CLOSE</span>
        <span className="text-[10px] text-red-200 hidden sm:inline">(ESC)</span>
      </button>

      {/* Modal Content Box - Adapts width dynamically based on 9:16 vertical or 16:9 widescreen format */}
      <div
        ref={containerRef}
        className={`relative z-10 w-full bg-[#0a0c14] text-white rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[95vh] transition-all duration-500 ease-out ${
          isVertical ? "max-w-md sm:max-w-lg md:max-w-xl" : "max-w-5xl"
        }`}
      >
        {/* Ambient Backlight Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#0d101d]/90 backdrop-blur-md relative z-20">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>{isVertical ? "REEL • 9:16" : "THEATRE • 16:9"}</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-1.5 truncate max-w-[180px] sm:max-w-xs md:max-w-md">
              <span className="truncate">{project.title}</span>
              <span className="hidden md:inline text-indigo-400 font-mono text-xs font-normal">
                &bull; {project.category}
              </span>
            </h4>
          </div>

          <div className="flex items-center space-x-2">
            {/* Aspect Tag */}
            <div className="hidden sm:flex items-center space-x-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono">
              {isVertical ? <Smartphone className="w-3 h-3 text-indigo-400" /> : <Tv className="w-3 h-3 text-indigo-400" />}
              <span>{isVertical ? "9:16 VERTICAL" : "16:9 WIDE"}</span>
            </div>

            {/* Audio Indicator */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold">
              <Volume2 className="w-3 h-3 text-indigo-400" />
              <span>STEREO AUDIO</span>
            </div>

            {/* Google Drive Direct Link */}
            {project.driveUrl && (
              <a
                href={project.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-indigo-600/30 hover:bg-indigo-600/60 border border-indigo-500/40 text-indigo-200 text-[10px] font-mono font-bold transition-colors cursor-pointer"
                title="Open in Google Drive"
              >
                <span>DRIVE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* YouTube Direct Link */}
            {project.youtubeUrl && (
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-red-600/30 hover:bg-red-600/60 border border-red-500/40 text-red-200 text-[10px] font-mono font-bold transition-colors cursor-pointer"
                title="Watch on YouTube"
              >
                <span>YOUTUBE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Header Close Button */}
            <button
              onClick={onClose}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-red-500/20 hover:bg-red-500 border border-red-500/40 text-red-300 hover:text-white transition-all cursor-pointer text-xs font-bold font-mono"
              aria-label="Close modal"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">CLOSE</span>
            </button>
          </div>
        </div>

        {/* Video Player Display Area: Supports 9:16 Shorts with ambient glow and 16:9 Wide */}
        <div
          className={`relative w-full bg-black overflow-hidden group flex items-center justify-center transition-all duration-300 ${
            isVertical
              ? "h-[58vh] sm:h-[64vh] md:h-[68vh] aspect-[9/16] mx-auto"
              : "aspect-video"
          }`}
        >
          {/* Ambient Blurred Background Layer for 9:16 Shorts */}
          {isVertical && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="500px"
                className="object-cover blur-3xl scale-125 opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
            </div>
          )}

          {/* YouTube or HTML5 Video Embed */}
          {project.youtubeId ? (
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <iframe
                key={project.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0 rounded-none object-contain"
              />
            </div>
          ) : (
            <video
              src={project.videoUrl}
              poster={project.image}
              autoPlay
              controls
              playsInline
              className={`relative z-10 w-full h-full ${
                isVertical
                  ? "object-contain max-h-[58vh] sm:max-h-[64vh] md:max-h-[68vh]"
                  : "object-contain"
              }`}
            />
          )}

          {/* Prev / Next Video Navigation Overlay Buttons */}
          {projects.length > 1 && onSelectProject && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
                  onSelectProject(prevIdx);
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-indigo-600 border border-white/20 text-white flex items-center justify-center opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-110"
                title="Previous Video"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const nextIdx = (currentIndex + 1) % projects.length;
                  onSelectProject(nextIdx);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-indigo-600 border border-white/20 text-white flex items-center justify-center opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-110"
                title="Next Video"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Project Meta Information & Multi-video Selector */}
        <div className="p-4 sm:p-5 bg-[#0b0e1a] space-y-3 border-t border-white/10 overflow-y-auto max-h-48 sm:max-h-56">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-1.5 text-[9px] font-mono tracking-widest text-indigo-400 font-bold uppercase">
                <Radio className="w-3 h-3 text-indigo-400" />
                <span>{isVertical ? "9:16 VERTICAL REEL" : "16:9 SHOWCASE"} &bull; STEREO AUDIO</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                {project.title}
              </h3>
            </div>

            {/* Software badges */}
            <div className="flex flex-wrap items-center gap-1">
              {project.software.map((sw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono font-medium text-slate-300"
                >
                  {sw}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Quick Playlist Switcher */}
          {projects.length > 1 && onSelectProject && (
            <div className="pt-1">
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-bold flex items-center justify-between">
                <span>ALL REEL VIDEOS ({projects.length}):</span>
                <div className="flex items-center space-x-2">
                  {project.driveUrl && (
                    <a
                      href={project.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 normal-case text-[10px]"
                    >
                      <span>Drive</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.youtubeUrl && (
                    <a
                      href={project.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:text-red-300 flex items-center gap-1 normal-case text-[10px]"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectProject(idx)}
                    className={`flex-shrink-0 flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all cursor-pointer ${
                      idx === currentIndex
                        ? "bg-indigo-600/30 border-indigo-400 text-white font-bold"
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span className="truncate max-w-[140px]">{p.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
