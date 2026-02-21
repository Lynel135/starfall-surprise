import { motion } from "framer-motion";
import tigerCatImg from "@/assets/tiger-cat-balloons.png";

const ThankYouPage = () => {
  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-3xl md:text-5xl font-display text-primary text-glow-gold text-center mb-8"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Terima Kasih Sudah Ada 🌙✨
      </motion.h1>

      <motion.p
        className="text-foreground/70 font-body text-center text-lg mb-10 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Kehadiranmu adalah hadiah terbaik. Semoga kebahagiaan selalu menyertaimu. 💖
      </motion.p>

      <motion.div
        className="relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <motion.img
          src={tigerCatImg}
          alt="Tiger and cat with balloons"
          className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_40px_hsl(42_78%_60%_/_0.3)]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `hsl(${[42, 340, 210, 270, 42, 340][i]} 70% 65%)`,
              left: `${20 + i * 12}%`,
              top: `${10 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>

      <motion.p
        className="mt-12 text-muted-foreground font-body text-xs text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Dibuat dengan 💖 khusus untukmu
      </motion.p>
    </motion.div>
  );
};

export default ThankYouPage;
