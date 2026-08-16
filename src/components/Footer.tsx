"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 sm:px-10 border-t border-white/60 z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
        <div>
          &copy; {new Date().getFullYear()} Ashutosh Charpe. All rights reserved.
        </div>
        <div className="flex items-center space-x-1.5">
          <span>Made with</span>
          <span className="text-purple-600 animate-pulse">&hearts;</span>
          <span>and lots of caffeine.</span>
        </div>
      </div>
    </footer>
  );
}
