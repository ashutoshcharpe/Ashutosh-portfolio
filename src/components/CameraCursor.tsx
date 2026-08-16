"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

export default function CameraCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize realistic DSLR camera focus beep & shutter click using Web Audio API
  const playCameraFocusSound = useCallback(() => {
    try {
      // Re-initialize AudioContext if null or closed
      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }

      const ctx = audioCtxRef.current;
      if (!ctx) return;

      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // 1. DSLR Autofocus Confirmation Dual-Tone Beep (Clear & Crisp)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1760, now); // A6 (1760Hz)
      osc1.frequency.setValueAtTime(2349.32, now + 0.045); // D7 (2349Hz)

      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.14);

      // 2. Mechanical Shutter Click / Diaphragm Snap
      const bufferSize = Math.floor(ctx.sampleRate * 0.04);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3200, now);
      filter.Q.setValueAtTime(2.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.04);
    } catch (e) {
      console.warn("AudioContext error on camera click sound:", e);
    }
  }, []);

  useEffect(() => {
    // Only enable custom cursor on devices that support hover (desktops/laptops)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("button, a, input, textarea, select, [role='button'], .cursor-pointer")
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      playCameraFocusSound();
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Attach global click & mousedown listeners to guarantee instant sound response on every click
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [playCameraFocusSound]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75 ease-out select-none will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Centered Reticle Container */}
      <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Center Autofocus Dot / Crosshair */}
        <div
          className={`rounded-full transition-all duration-200 ${
            isClicked
              ? "w-2.5 h-2.5 bg-emerald-400 shadow-[0_0_15px_#34d399] scale-125"
              : isHovered
              ? "w-2 h-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"
              : "w-1.5 h-1.5 bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.8)]"
          }`}
        />

        {/* Outer DSLR Viewfinder Focus Frame Brackets [  ] */}
        <div
          className={`absolute transition-all duration-200 pointer-events-none ${
            isClicked
              ? "w-7 h-7 scale-90 border-emerald-400 rotate-45 shadow-[0_0_18px_rgba(52,211,153,0.7)]"
              : isHovered
              ? "w-9 h-9 scale-110 border-emerald-400 rotate-0 shadow-[0_0_12px_rgba(52,211,153,0.4)]"
              : "w-8 h-8 scale-100 border-indigo-600/70 rotate-0"
          }`}
        >
          {/* Top-Left Bracket Corner */}
          <span
            className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 transition-colors duration-200 ${
              isHovered || isClicked ? "border-emerald-400" : "border-indigo-600"
            }`}
          />
          {/* Top-Right Bracket Corner */}
          <span
            className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 transition-colors duration-200 ${
              isHovered || isClicked ? "border-emerald-400" : "border-indigo-600"
            }`}
          />
          {/* Bottom-Left Bracket Corner */}
          <span
            className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 transition-colors duration-200 ${
              isHovered || isClicked ? "border-emerald-400" : "border-indigo-600"
            }`}
          />
          {/* Bottom-Right Bracket Corner */}
          <span
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 transition-colors duration-200 ${
              isHovered || isClicked ? "border-emerald-400" : "border-indigo-600"
            }`}
          />
        </div>

        {/* Micro Viewfinder HUD Tag on Hover (e.g. AF-L [LOCK] / 4K) */}
        {isHovered && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-sm border border-emerald-400/40 text-[8px] font-mono font-black text-emerald-400 tracking-wider flex items-center space-x-1 whitespace-nowrap animate-fade-in shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>AF-LOCK</span>
          </div>
        )}
      </div>
    </div>
  );
}
