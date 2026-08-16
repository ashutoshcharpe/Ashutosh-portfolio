"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SidebarIndex from "@/components/SidebarIndex";
import FloatingBackground from "@/components/FloatingBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import WorkSection from "@/components/WorkSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("portfolio");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen selection:bg-indigo-500/20 selection:text-indigo-950 font-sans">
      {/* 3D Animated Background with Floating Gear & UI Elements */}
      <FloatingBackground />

      {/* Top Navbar (disappears when video modal is open) */}
      <Navbar activeSection={activeSection} isHidden={isVideoModalOpen} />

      {/* Left Vertical Numbered Index & Scroll indicator */}
      <SidebarIndex activeSection={activeSection} isHidden={isVideoModalOpen} />

      {/* Main Sections */}
      <div className="relative z-10 flex flex-col space-y-12 sm:space-y-16">
        {/* 01 Hero / Portfolio */}
        <HeroSection />

        {/* 02 About Me Card */}
        <AboutSection />

        {/* 04 My Work Section with 90s Film Roll Moving Horizontally */}
        <WorkSection onModalOpenChange={setIsVideoModalOpen} />

        {/* 03 Experience Timeline */}
        <ExperienceSection />

        {/* 05 Services Grid */}
        <ServicesSection />

        {/* 06 Contact Section */}
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
