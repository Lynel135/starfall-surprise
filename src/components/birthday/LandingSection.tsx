import { motion } from "framer-motion";

interface LandingSectionProps {
  onStart: () => void;
}

const LandingSection = ({ onStart }: LandingSectionProps) => {
  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
      >
        {/* Glow ring behind button */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
        
        <motion.button
          onClick={onStart}
          className="relative z-10 rounded-2xl border border-primary/30 bg-card/80 px-10 py-6 font-display text-2xl md:text-3xl text-primary backdrop-blur-sm box-glow-gold transition-all hover:border-primary/60 hover:bg-card"
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(42 78% 60% / 0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          Klik Untuk Kejutan 🎁
        </motion.button>
      </motion.div>

      <motion.p
        className="mt-8 text-sm text-muted-foreground font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        ✨ Ada sesuatu yang special menunggumu ✨
      </motion.p>
    </motion.div>
  );
};

export default LandingSection;
