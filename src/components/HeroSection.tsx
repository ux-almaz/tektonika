import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import PillButton from "./PillButton";

const HeroSection = ({ introDone = false }: { introDone?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (introDone && videoRef.current && !videoLoaded) {
      videoRef.current.src = "/videos/hero-bg.mp4";
      videoRef.current.load();
      setVideoLoaded(true);
    }
  }, [introDone, videoLoaded]);

  return (
    <section className="relative pt-0 flex-1 flex flex-col border-0">
      <div className="site-container flex-1 flex flex-col">
        {/* Background video with padding */}
        <div className="relative overflow-hidden flex-1 min-h-[400px] rounded-3xl flex flex-col">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={introDone ? { scale: 1, opacity: 1 } : { scale: 1.15, opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40" />
          </motion.div>

          {/* Content */}
          <div className="relative flex flex-col justify-end flex-1 min-h-[400px] px-5 md:px-16 lg:px-20">
            <div className="pb-10 md:pb-20 pt-12 md:pt-[100px]">
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-4xl md:text-7xl lg:text-[96px] font-medium uppercase leading-none tracking-[-2.4px] text-background"
                  initial={{ y: "100%" }}
                  animate={introDone ? { y: "0%" } : { y: "100%" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                  ЖК Тектоника
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  className="mt-5 text-lg md:text-2xl font-medium text-[hsl(0,0%,83%)] leading-[1.17]"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={introDone ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                >
                  Старт продаж!
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              >
                <Link to="/project">
                  <PillButton variant="yellow" withArrow className="mt-10">
                    Подробнее
                  </PillButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
