"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Radio,
  Smartphone,
  Tv,
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [audioBlocked, setAudioBlocked] = useState<boolean>(false);
  const [isHoveringPlayer, setIsHoveringPlayer] = useState<boolean>(true);
  const [isVertical, setIsVertical] = useState<boolean>(false);

  // Play video with audio enabled when modal opens
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = volume;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAudioBlocked(false);
        })
        .catch((err) => {
          console.warn("Unmuted autoplay restricted by browser policy:", err);
          video.muted = true;
          setIsMuted(true);
          setAudioBlocked(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }
  }, [project, volume]);

  // Handle Unmute Click / Tap to Enable Audio
  const handleEnableAudio = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = volume > 0 ? volume : 0.85;
    setIsMuted(false);
    setAudioBlocked(false);
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [volume]);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // Toggle Mute / Unmute
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || isMuted) {
      video.muted = false;
      setIsMuted(false);
      if (volume === 0) {
        setVolume(0.85);
        video.volume = 0.85;
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  // Handle Volume Slider Change
  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    const video = videoRef.current;
    if (!video) return;
    video.volume = newVal;
    if (newVal === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  // Skip time (-10s / +10s)
  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
  };

  // Change Playback Speed
  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard Shortcuts (Space, M, F, Esc, Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m" || e.key === "M") {
        toggleMute();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "ArrowLeft") {
        skipTime(-5);
      } else if (e.key === "ArrowRight") {
        skipTime(5);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, togglePlay, toggleMute]);

  // Format Time (00:00)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-2xl animate-fade-in select-none">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Box - Adapts width dynamically based on 9:16 vertical or 16:9 widescreen format */}
      <div
        ref={containerRef}
        className={`relative z-10 w-full bg-[#0a0c14] text-white rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[95vh] transition-all duration-500 ease-out ${
          isVertical ? "max-w-md sm:max-w-lg md:max-w-2xl" : "max-w-5xl"
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

            {/* Audio Wave Visualizer Pill */}
            <div className="hidden sm:flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono">
              <span>STEREO</span>
              <div className="flex items-end space-x-0.5 h-2.5 ml-1">
                {[40, 90, 60, 100, 75, 45].map((h, i) => (
                  <span
                    key={i}
                    className={`w-0.5 rounded-full ${
                      isPlaying && !isMuted
                        ? "bg-indigo-400 animate-pulse"
                        : "bg-slate-600"
                    }`}
                    style={{
                      height: isPlaying && !isMuted ? `${h}%` : "30%",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Display Area: Supports 9:16 with Ambient Blurred Background and 16:9 */}
        <div
          className={`relative w-full bg-black overflow-hidden group flex items-center justify-center transition-all duration-300 ${
            isVertical
              ? "h-[58vh] sm:h-[64vh] md:h-[68vh] aspect-[9/16] mx-auto"
              : "aspect-video"
          }`}
          onMouseEnter={() => setIsHoveringPlayer(true)}
          onMouseLeave={() => setIsHoveringPlayer(false)}
        >
          {/* Ambient Blurred Background Layer for 9:16 / Vertical on Laptops/Desktops (Zero Video GPU Overhead) */}
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

          {/* Main Playable Video */}
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.image}
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              const target = e.currentTarget;
              setDuration(target.duration);
              // Auto detect if video is vertical (9:16)
              const vertical = target.videoHeight > target.videoWidth;
              setIsVertical(vertical);
            }}
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
              }
            }}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className={`relative z-10 w-full h-full cursor-pointer ${
              isVertical
                ? "object-contain max-h-[58vh] sm:max-h-[64vh] md:max-h-[68vh] drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                : "object-contain"
            }`}
          />

          {/* Autoplay Audio Blocked Banner Prompt */}
          {audioBlocked && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 animate-bounce">
              <button
                onClick={handleEnableAudio}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-2xl border border-white/30 cursor-pointer transition-all"
              >
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>TAP TO ENABLE STEREO AUDIO</span>
              </button>
            </div>
          )}

          {/* Prev / Next Video Quick Buttons inside player */}
          {projects.length > 1 && onSelectProject && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
                  onSelectProject(prevIdx);
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-indigo-600 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-110"
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
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-indigo-600 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-110"
                title="Next Video"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Center Play/Pause Overlay Indicator on Hover */}
          <div
            onClick={togglePlay}
            className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
              !isPlaying ? "opacity-100 bg-black/40" : "opacity-0 group-hover:opacity-60"
            }`}
          >
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-indigo-600/90 backdrop-blur-md text-white flex items-center justify-center shadow-2xl border border-white/30 transform transition-transform group-hover:scale-105">
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white" />
              ) : (
                <Play className="w-7 h-7 fill-white ml-1" />
              )}
            </div>
          </div>

          {/* Custom Video Controls Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent transition-opacity duration-300 z-30 flex flex-col space-y-2 ${
              isHoveringPlayer || !isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {/* Scrubber / Progress Bar */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = clickX / rect.width;
                if (videoRef.current && duration > 0) {
                  videoRef.current.currentTime = newProgress * duration;
                  setCurrentTime(newProgress * duration);
                }
              }}
              className="w-full h-1.5 hover:h-2.5 bg-white/25 rounded-full cursor-pointer transition-all relative overflow-hidden group/bar"
            >
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
              </div>
            </div>

            {/* Bottom Row Controls */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              {/* Left Controls: Play/Pause, Rewind, Forward, Audio Volume */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="hover:text-white transition-colors cursor-pointer p-1"
                  title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                {/* Rewind 10s */}
                <button
                  onClick={() => skipTime(-10)}
                  className="hover:text-white transition-colors cursor-pointer hidden sm:block p-1"
                  title="Rewind 10s (Left Arrow)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Fast Forward 10s */}
                <button
                  onClick={() => skipTime(10)}
                  className="hover:text-white transition-colors cursor-pointer hidden sm:block p-1"
                  title="Forward 10s (Right Arrow)"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>

                {/* Audio Volume Controls */}
                <div className="flex items-center space-x-1.5 group/vol">
                  <button
                    onClick={toggleMute}
                    className="hover:text-white transition-colors cursor-pointer p-1"
                    title={isMuted ? "Unmute (M)" : "Mute (M)"}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-red-400" />
                    ) : volume < 0.5 ? (
                      <Volume1 className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-indigo-400" />
                    )}
                  </button>

                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-12 sm:w-16 h-1.5 bg-white/25 accent-indigo-500 rounded-lg cursor-pointer transition-all"
                    title={`Volume ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                  />
                </div>

                {/* Timestamp */}
                <div className="text-slate-300 font-mono text-[10px] sm:text-xs">
                  <span className="text-white font-bold">{formatTime(currentTime)}</span>
                  <span className="text-slate-500"> / </span>
                  <span>{formatTime(duration) || project.duration}</span>
                </div>
              </div>

              {/* Right Controls: Speed, Fullscreen */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Speed selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-200 transition-colors cursor-pointer"
                  >
                    {playbackRate}x
                  </button>

                  {showSpeedMenu && (
                    <div className="absolute bottom-8 right-0 bg-[#121526] border border-white/20 rounded-xl p-1 shadow-2xl flex flex-col space-y-1 z-40 text-xs">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handleSpeedChange(rate)}
                          className={`px-3 py-1 rounded-lg text-left transition-colors cursor-pointer ${
                            playbackRate === rate
                              ? "bg-indigo-600 text-white font-bold"
                              : "hover:bg-white/10 text-slate-300"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="hover:text-white transition-colors cursor-pointer p-1"
                  title="Fullscreen (F)"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
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
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-bold">
                MORE REEL ITEMS:
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-1">
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
                    <span className="truncate max-w-[120px]">{p.title}</span>
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
