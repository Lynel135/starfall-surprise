import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import tigerImg from "@/assets/tiger-cute.png";
import catImg from "@/assets/cat-cute.png";

interface SurpriseSectionProps {
  onNext: () => void;
}

const SurpriseSection = ({ onNext }: SurpriseSectionProps) => {
  useEffect(() => {
    // Fire confetti bursts
    const fire = () => {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#d4a843", "#d4577a", "#4a9eff", "#9b59b6"] });
      setTimeout(() => {
        confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#d4a843", "#d4577a"] });
        confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#4a9eff", "#9b59b6"] });
      }, 400);
    };
    fire();
    const interval = setInterval(fire, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex items-end gap-4 mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.6 }}
      >
        <motion.img
          src={tigerImg}
          alt="Tiger"
          className="w-28 h-28 md:w-40 md:h-40 object-contain"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.8 }}
        />
        <motion.img
          src={catImg}
          alt="Cat"
          className="w-24 h-24 md:w-36 md:h-36 object-contain"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.8, delay: 0.3 }}
        />
      </motion.div>

      <motion.h1
        className="text-4xl md:text-6xl font-display text-center gradient-magic bg-clip-text text-transparent mb-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
        style={{
          backgroundImage: "linear-gradient(135deg, hsl(270 60% 55%), hsl(340 60% 60%), hsl(42 78% 60%))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        SURPRISE!!! 🎊🎂✨
      </motion.h1>

      <motion.p
        className="text-foreground/70 font-body text-center text-lg mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Semua harapan dan pesan sudah terkirim! 💫
      </motion.p>

      <motion.button
        onClick={onNext}
        className="rounded-xl border border-primary/30 bg-card/60 px-8 py-3 font-body text-primary backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-card box-glow-gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Halaman Terakhir →
      </motion.button>
    </motion.div>
  );
};

export default SurpriseSection;
