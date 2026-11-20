"use client";

import React, { useEffect, useCallback } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import LoadingScreen from "@/components/LoadingScreen";
import About from "@/components/About";
import DesignProcess from "@/components/Desingprocess";
import FAQ from "@/components/FAQ";
import Scrollcomp from "@/components/Scrollcomp";
import { useNavigation, type IntroStage } from "@/context/NavigationContext";
import Hero1 from "@/components/hero1";

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
    <main className="relative min-h-screen bg-white text-[#171816]">
      {/* 0. Cinematic Loading Intro Animation Screen */}
      <LoadingScreen
        onStageChange={handleStageChange}
        onComplete={handleIntroComplete}
      />

      {/* 2. Immersive Hero Section (Dark photographic background) */}
      <Hero />
      {/* <Hero1 /> */}

      <About />
      {/* 3. Horizontal Scrolling Services Section (Pinned desktop / Native mobile) */}
      <Services />


      <DesignProcess />
      <FAQ />


      <Scrollcomp />
    </main>
  );
}
