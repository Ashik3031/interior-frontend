"use client";

import React, { useEffect, useCallback } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import About from "@/components/About";
import DesignProcess from "@/components/Desingprocess";
import FAQ from "@/components/FAQ";
import Scrollcomp from "@/components/Scrollcomp";
import { useNavigation, type IntroStage } from "@/context/NavigationContext";

export default function Home() {
  const { setIntroStage, setActiveSection } = useNavigation();

  useEffect(() => {
    setActiveSection("home");
  }, [setActiveSection]);

  const handleStageChange = useCallback(
    (stage: IntroStage) => {
      setIntroStage(stage);
    },
    [setIntroStage]
  );

  const handleIntroComplete = useCallback(() => {
    setIntroStage("complete");
  }, [setIntroStage]);

  return (
    <main className="relative min-h-screen bg-[#171816] text-[#F5F0E7]">
      {/* 0. Cinematic Loading Intro Animation Screen */}
      <LoadingScreen
        onStageChange={handleStageChange}
        onComplete={handleIntroComplete}
      />

      {/* 1. Right-Side Editorial Scroll Progress Indicator (Custom scrollbar replacement) */}
      <ScrollProgress onSectionChange={setActiveSection} />

      {/* 2. Immersive Hero Section (Dark photographic background) */}
      <Hero />

      {/* 3. Horizontal Scrolling Services Section (Pinned desktop / Native mobile) */}
      <Services />

      <About />
      <DesignProcess />
      <FAQ />

      <Scrollcomp />
    </main>
  );
}
