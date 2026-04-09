import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logoLight from "@/assets/tektonika-logo-light.svg";

const BARS = 12;
const LOGO_DURATION = 0.9;
const HOLD_DURATION = 0.35;
const EXIT_DURATION = 0.5;
const EXIT_STAGGER = 0.04;

const totalExit = EXIT_DURATION + (BARS - 1) * EXIT_STAGGER; // ~0.94s

const PageIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"hold" | "exit" | "done">("hold");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), (LOGO_DURATION + HOLD_DURATION) * 1000);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, (LOGO_DURATION + HOLD_DURATION + totalExit + 0.15) * 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Solid background + bars for exit wipe */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: BARS }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-foreground"
            initial={{ scaleX: 1, originX: 1 }}
            animate={phase === "exit" ? { scaleX: 0 } : { scaleX: 1 }}
            transition={
              phase === "exit"
                ? {
                    duration: EXIT_DURATION,
                    delay: i * EXIT_STAGGER,
                    ease: [0.76, 0, 0.24, 1],
                  }
                : { duration: 0 }
            }
          />
        ))}
      </div>

      {/* Centered logo — reveals left-to-right, fades out on exit */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="overflow-hidden"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: LOGO_DURATION, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={logoLight}
            alt="Тектоника"
            className="h-8 md:h-12 w-auto"
            animate={{ opacity: phase === "exit" ? 0 : 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PageIntro;
