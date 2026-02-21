import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/birthday/ParticleBackground";
import LandingSection from "@/components/birthday/LandingSection";
import CakeAnimation from "@/components/birthday/CakeAnimation";
import CardsSection from "@/components/birthday/CardsSection";
import SurpriseSection from "@/components/birthday/SurpriseSection";
import ThankYouPage from "@/components/birthday/ThankYouPage";

type Phase = "landing" | "cake" | "cards" | "surprise" | "thankyou";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("landing");

  return (
    <div className="relative min-h-screen gradient-dark-bg overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === "landing" && (
            <LandingSection key="landing" onStart={() => setPhase("cake")} />
          )}
          {phase === "cake" && (
            <CakeAnimation key="cake" onComplete={() => setPhase("cards")} />
          )}
          {phase === "cards" && (
            <CardsSection key="cards" onAllDone={() => setPhase("surprise")} />
          )}
          {phase === "surprise" && (
            <SurpriseSection key="surprise" onNext={() => setPhase("thankyou")} />
          )}
          {phase === "thankyou" && (
            <ThankYouPage key="thankyou" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
