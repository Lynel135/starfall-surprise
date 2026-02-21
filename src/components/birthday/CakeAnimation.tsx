import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tigerImg from "@/assets/tiger-cute.png";
import cakeImg from "@/assets/birthday-cake.png";

interface CakeAnimationProps {
  onComplete: () => void;
}

const CakeAnimation = ({ onComplete }: CakeAnimationProps) => {
  const [phase, setPhase] = useState(0); // 0=tiger appears, 1=making cake, 2=cake reveal, 3=text

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Tiger */}
      <motion.div
        className="relative mb-8"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <motion.img
          src={tigerImg}
          alt="Cute tiger"
          className="w-32 h-32 md:w-40 md:h-40 object-contain"
          animate={phase === 1 ? { rotate: [0, -15, 15, -15, 15, 0], y: [0, -10, 0, -10, 0] } : {}}
          transition={{ duration: 2, repeat: phase === 1 ? Infinity : 0, repeatType: "loop" }}
        />
      </motion.div>

      {/* Colorful strokes / progress */}
      <AnimatePresence>
        {phase >= 1 && phase < 2 && (
          <motion.div
            className="flex items-center gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-12 rounded-full"
                style={{
                  background: `hsl(${[42, 340, 210, 270, 42][i]} 70% 60%)`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.4, duration: 0.5 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {phase >= 1 && phase < 2 && (
        <motion.p
          className="text-muted-foreground font-body text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Sedang membuat sesuatu untukmu... 🎨
        </motion.p>
      )}

      {/* Cake reveal */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          >
            <motion.img
              src={cakeImg}
              alt="Birthday cake"
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_30px_hsl(42_78%_60%_/_0.4)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Birthday text */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-display text-primary text-glow-gold mb-4">
              Selamat Ulang Tahun Erry 🎉
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 font-body italic">
              Semoga hari ini seindah senyummu.
            </p>

            <motion.button
              onClick={onComplete}
              className="mt-10 rounded-xl border border-primary/30 bg-card/60 px-8 py-3 font-body text-primary backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-card box-glow-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Lanjutkan →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CakeAnimation;
