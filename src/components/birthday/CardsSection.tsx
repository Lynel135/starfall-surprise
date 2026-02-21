import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface CardsSectionProps {
  onAllDone: () => void;
}

const prayerText = `Semoga Allah SWT senantiasa memberikanmu kebahagiaan yang tak terhingga, kesehatan yang berlimpah, dan rezeki yang penuh berkah. Semoga setiap langkahmu dipenuhi cahaya, setiap doamu diijabah, dan setiap mimpimu menjadi kenyataan. Di usia yang baru ini, semoga kamu semakin bersinar, semakin kuat, dan semakin dicintai oleh orang-orang di sekitarmu. 🤍✨`;

const CardsSection = ({ onAllDone }: CardsSectionProps) => {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [harapan, setHarapan] = useState("");
  const [pesan, setPesan] = useState("");
  const [sentHarapan, setSentHarapan] = useState(false);
  const [sentPesan, setSentPesan] = useState(false);
  const [prayerRevealed, setPrayerRevealed] = useState(false);
  const [typedText, setTypedText] = useState("");

  const handleSendHarapan = () => {
    if (!harapan.trim()) return;
    setSentHarapan(true);
    setOpenCard(null);
    checkAllDone(true, sentPesan);
  };

  const handleSendPesan = () => {
    if (!pesan.trim()) return;
    setSentPesan(true);
    setOpenCard(null);
    checkAllDone(sentHarapan, true);
  };

  const checkAllDone = (h: boolean, p: boolean) => {
    if (h && p) {
      setTimeout(onAllDone, 1500);
    }
  };

  const startTypewriter = () => {
    if (prayerRevealed) return;
    setPrayerRevealed(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(prayerText.slice(0, i));
      if (i >= prayerText.length) clearInterval(interval);
    }, 30);
  };

  const cards = [
    {
      title: "Harapan Untukmu ✨",
      color: "gold" as const,
      sent: sentHarapan,
    },
    {
      title: "Doa Untukmu 🤍",
      color: "pink" as const,
      sent: false,
    },
    {
      title: "Pesan Rahasia 💌",
      color: "blue" as const,
      sent: sentPesan,
    },
  ];

  const glowClasses = {
    gold: "box-glow-gold border-primary/40 hover:border-primary/70",
    pink: "box-glow-pink border-secondary/40 hover:border-secondary/70",
    blue: "box-glow-blue border-accent/40 hover:border-accent/70",
  };

  const textColors = {
    gold: "text-primary",
    pink: "text-secondary",
    blue: "text-accent",
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className="mb-10 font-display text-2xl md:text-4xl text-primary text-glow-gold text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Ada 3 hal spesial untukmu 🎁
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            className={`relative cursor-pointer rounded-2xl border bg-card/70 p-6 backdrop-blur-sm transition-all ${glowClasses[card.color]}`}
            initial={{ x: idx === 0 ? -100 : idx === 2 ? 100 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.2, type: "spring" }}
            whileHover={{ scale: 1.03 }}
            onClick={() => {
              if (card.sent) return;
              setOpenCard(idx);
              if (idx === 1) startTypewriter();
            }}
          >
            {card.sent && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-2xl bg-card/90 backdrop-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className={`flex flex-col items-center ${textColors[card.color]}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <Check className="w-12 h-12 mb-2" />
                  <span className="font-body text-sm">Terkirim!</span>
                </motion.div>
              </motion.div>
            )}
            <h3 className={`font-display text-xl mb-2 ${textColors[card.color]}`}>
              {card.title}
            </h3>
            <p className="text-muted-foreground font-body text-sm">
              {idx === 0 && "Tuliskan harapanmu..."}
              {idx === 1 && "Baca doa spesial ini..."}
              {idx === 2 && "Kirim pesan rahasiamu..."}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Modal overlays */}
      <AnimatePresence>
        {openCard !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenCard(null)}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl border border-border bg-card p-6 md:p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Harapan card */}
              {openCard === 0 && !sentHarapan && (
                <>
                  <h3 className="font-display text-2xl text-primary mb-4">Harapan Untukmu ✨</h3>
                  <textarea
                    value={harapan}
                    onChange={(e) => setHarapan(e.target.value)}
                    placeholder="Tuliskan harapanmu di sini..."
                    className="w-full rounded-xl border border-border bg-muted p-4 text-foreground font-body text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <motion.button
                    onClick={handleSendHarapan}
                    className="mt-4 w-full rounded-xl bg-primary py-3 font-body text-primary-foreground font-medium transition-all hover:opacity-90"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Kirim ✨
                  </motion.button>
                </>
              )}

              {/* Doa card */}
              {openCard === 1 && (
                <>
                  <h3 className="font-display text-2xl text-secondary mb-4">Doa Untukmu 🤍</h3>
                  <p className="font-body text-foreground/80 text-sm leading-relaxed">
                    {typedText}
                    {typedText.length < prayerText.length && (
                      <span className="animate-pulse">|</span>
                    )}
                  </p>
                  {typedText.length >= prayerText.length && (
                    <motion.button
                      onClick={() => setOpenCard(null)}
                      className="mt-6 w-full rounded-xl border border-secondary/40 py-3 font-body text-secondary transition-all hover:bg-secondary/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      Terima Kasih 🤍
                    </motion.button>
                  )}
                </>
              )}

              {/* Pesan card */}
              {openCard === 2 && !sentPesan && (
                <>
                  <h3 className="font-display text-2xl text-accent mb-4">Pesan Rahasia 💌</h3>
                  <textarea
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    placeholder="Tulis pesan rahasiamu..."
                    className="w-full rounded-xl border border-border bg-muted p-4 text-foreground font-body text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <motion.button
                    onClick={handleSendPesan}
                    className="mt-4 w-full rounded-xl bg-accent py-3 font-body text-accent-foreground font-medium transition-all hover:opacity-90"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Kirim 💌
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardsSection;
