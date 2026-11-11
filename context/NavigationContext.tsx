"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type IntroStage = "revealing" | "holding" | "traveling" | "complete";

interface NavigationContextType {
  introStage: IntroStage;
  setIntroStage: (stage: IntroStage) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  introStage: "complete",
  setIntroStage: () => {},
  activeSection: "home",
  setActiveSection: () => {},
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [introStage, setIntroStageState] = useState<IntroStage>("complete");
  const [activeSection, setActiveSectionState] = useState("home");

  const setIntroStage = useCallback((stage: IntroStage) => {
    setIntroStageState(stage);
  }, []);

  const setActiveSection = useCallback((section: string) => {
    setActiveSectionState(section);
  }, []);

  return (
    <NavigationContext.Provider
      value={{ introStage, setIntroStage, activeSection, setActiveSection }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

