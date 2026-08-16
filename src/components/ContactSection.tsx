"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, MessageCircle, Check, Copy, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("ashu.edits17@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const contactChannels = [
    {
      name: "EMAIL",
      value: "ashutoshcharpe.mp4@gmail.com",
      href: "mailto:ashutoshcharpe.mp4@gmail.com",
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
          <Mail className="w-6 h-6" />
        </div>
      ),
      actionText: "Send Mail",
      isEmail: true,
    },
    {
      name: "WHATSAPP",
      value: "+91 7620443842",
      href: "https://wa.me/917620443842",
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md">
          <MessageCircle className="w-6 h-6" />
        </div>
      ),
      actionText: "Chat on WhatsApp",
      isEmail: false,
    },
    {
      name: "INSTAGRAM",
      value: "@ashutosh_charpe",
      href: "https://instagram.com/ashutosh_charpe",
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-none stroke-white stroke-2 stroke-linecap-round stroke-linejoin-round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </div>
      ),
      actionText: "Follow on Instagram",
      isEmail: false,
    },
  ];

  return (
    <section id="contact" className="relative py-20 px-6 sm:px-10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Glass Card Container */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-10">
            {/* Header */}
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-flex items-center space-x-2">
                <span className="text-[11px] font-extrabold tracking-[0.25em] text-indigo-600 uppercase">
                  CONTACT
                </span>
                <div className="w-6 h-[1.5px] bg-indigo-500/60 rounded-full" />
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-serif">
                Let&apos;s Create <br />
                Something <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Great</span>.
              </h3>
            </div>

            {/* 3 Click and Open Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactChannels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.href}
                  target={channel.isEmail ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="glass-pill p-6 rounded-2xl flex items-center space-x-4 hover:scale-[1.03] transition-all duration-300 group shadow-md border border-white hover:border-indigo-300 cursor-pointer bg-white/70"
                >
                  <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                    {channel.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
                      {channel.name}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                      {channel.value}
                    </div>
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-900 transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Copy Notification Pill */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleCopyEmail}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied ashutoshcharpe.mp4@gmail.com!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy email address to clipboard</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Floating 3D Clapperboard & Scissors Assets */}
          <div className="absolute -bottom-8 -right-4 w-40 sm:w-56 pointer-events-none opacity-90 hidden md:block">
            <Image
              src="/images/scissors.png"
              alt="3D Scissors"
              width={300}
              height={300}
              className="w-full h-auto drop-shadow-2xl mix-blend-multiply"
            />
          </div>
          <div className="absolute top-6 right-8 w-28 sm:w-36 pointer-events-none opacity-80 hidden lg:block animate-float-slow">
            <Image
              src="/images/clapperboard.png"
              alt="3D Clapperboard"
              width={220}
              height={220}
              className="w-full h-auto drop-shadow-xl mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
