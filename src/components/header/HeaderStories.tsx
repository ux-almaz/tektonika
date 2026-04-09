import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { headerStories } from "./stories-data";

type StoryPosition = {
  storyIndex: number;
  slideIndex: number;
};

const INITIAL_POSITION: StoryPosition = {
  storyIndex: 0,
  slideIndex: 0,
};

const getNextPosition = ({ storyIndex, slideIndex }: StoryPosition): StoryPosition | null => {
  const story = headerStories[storyIndex];

  if (!story) {
    return null;
  }

  if (slideIndex < story.slides.length - 1) {
    return { storyIndex, slideIndex: slideIndex + 1 };
  }

  if (storyIndex < headerStories.length - 1) {
    return { storyIndex: storyIndex + 1, slideIndex: 0 };
  }

  return null;
};

const getPreviousPosition = ({ storyIndex, slideIndex }: StoryPosition): StoryPosition | null => {
  if (slideIndex > 0) {
    return { storyIndex, slideIndex: slideIndex - 1 };
  }

  if (storyIndex > 0) {
    const previousStory = headerStories[storyIndex - 1];

    return {
      storyIndex: storyIndex - 1,
      slideIndex: previousStory.slides.length - 1,
    };
  }

  return null;
};

const HeaderStories = ({ introDone = false }: { introDone?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<StoryPosition>(INITIAL_POSITION);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewedStories, setViewedStories] = useState<string[]>([]);
  const progressRef = useRef(0);

  const currentStory = headerStories[position.storyIndex];
  const currentSlide = currentStory.slides[position.slideIndex];
  const viewedLookup = useMemo(() => new Set(viewedStories), [viewedStories]);

  const markViewed = useCallback((storyIndex: number) => {
    const storyId = headerStories[storyIndex]?.id;

    if (!storyId) {
      return;
    }

    setViewedStories((prev) => (prev.includes(storyId) ? prev : [...prev, storyId]));
  }, []);

  const closeViewer = useCallback(() => {
    setOpen(false);
    setIsPaused(false);
    setProgress(0);
    progressRef.current = 0;
  }, []);

  const moveTo = useCallback(
    (nextPosition: StoryPosition | null) => {
      if (!nextPosition) {
        closeViewer();
        return;
      }

      progressRef.current = 0;
      setProgress(0);
      setIsPaused(false);
      setPosition(nextPosition);
      markViewed(nextPosition.storyIndex);
    },
    [closeViewer, markViewed],
  );

  const goToNext = useCallback(() => {
    moveTo(getNextPosition(position));
  }, [moveTo, position]);

  const goToPrevious = useCallback(() => {
    moveTo(getPreviousPosition(position) ?? position);
  }, [moveTo, position]);

  const openStory = useCallback(
    (storyIndex: number) => {
      markViewed(storyIndex);
      progressRef.current = 0;
      setProgress(0);
      setIsPaused(false);
      setPosition({ storyIndex, slideIndex: 0 });
      setOpen(true);
    },
    [markViewed],
  );

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x <= -80) {
      goToNext();
      return;
    }

    if (info.offset.x >= 80) {
      goToPrevious();
    }
  };

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer();
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
      }

      if (event.key === " ") {
        event.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeViewer, goToNext, goToPrevious, open]);

  useEffect(() => {
    if (!open || isPaused) {
      return;
    }

    let frameId = 0;
    let previousTime: number | null = null;
    const duration = currentSlide.duration ?? 6500;

    const animate = (time: number) => {
      if (previousTime === null) {
        previousTime = time;
      }

      const delta = time - previousTime;
      previousTime = time;

      const nextValue = Math.min(progressRef.current + delta / duration, 1);
      progressRef.current = nextValue;
      setProgress(nextValue);

      if (nextValue >= 1) {
        goToNext();
        return;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [currentSlide.id, currentSlide.duration, goToNext, isPaused, open]);

  const viewer = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden bg-foreground text-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-w-resize"
            onClick={goToPrevious}
            aria-label="Предыдущая история"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-e-resize"
            onClick={goToNext}
            aria-label="Следующая история"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              onPointerDownCapture={() => setIsPaused(true)}
              onPointerUpCapture={() => setIsPaused(false)}
              onPointerCancel={() => setIsPaused(false)}
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/15 to-foreground/75" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-20 flex h-full flex-col justify-between p-4 sm:p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex gap-2">
                {currentStory.slides.map((slide, slideIndex) => {
                  const width = slideIndex < position.slideIndex ? "100%" : slideIndex === position.slideIndex ? `${progress * 100}%` : "0%";

                  return (
                    <div key={slide.id} className="h-1 flex-1 overflow-hidden rounded-full bg-background/20">
                      <motion.div className="h-full rounded-full bg-primary" animate={{ width }} transition={{ duration: 0.08, ease: "linear" }} />
                    </div>
                  );
                })}
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={currentStory.cover} alt={currentStory.title} className="h-11 w-11 rounded-full object-cover ring-1 ring-background/35" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-background/70">Stories</p>
                    <p className="text-base sm:text-lg">{currentStory.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPaused((prev) => !prev)}
                    className="rounded-full border border-background/20 bg-background/10 p-3 backdrop-blur transition-colors hover:bg-background/20"
                    aria-label={isPaused ? "Продолжить" : "Пауза"}
                  >
                    {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={closeViewer}
                    className="rounded-full border border-background/20 bg-background/10 p-3 backdrop-blur transition-colors hover:bg-background/20"
                    aria-label="Закрыть stories"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="max-w-3xl space-y-4">
                <p className="text-xs uppercase tracking-[0.32em] text-background/60">
                  Story {position.storyIndex + 1} / {headerStories.length}
                </p>
                <h2 className="max-w-3xl text-[28px] leading-[0.92] sm:text-[36px] md:text-[40px]">{currentSlide.title}</h2>
                <p className="max-w-xl text-sm leading-relaxed text-background/80 sm:text-base">{currentSlide.description}</p>
              </div>

              <div className="hidden min-[1200px]:flex items-center gap-3 self-center">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-background/20 bg-background/10 backdrop-blur transition-colors hover:bg-background/20"
                  aria-label="Предыдущая история"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-background/20 bg-background/10 backdrop-blur transition-colors hover:bg-background/20"
                  aria-label="Следующая история"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.div
        className="ml-2 flex items-center gap-1 overflow-visible sm:ml-3 sm:gap-1.5"
        initial={{ opacity: 0, x: -12 }}
        animate={introDone ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
        transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {headerStories.map((story, storyIndex) => {
          const isViewed = viewedLookup.has(story.id);

          return (
            <button
              key={story.id}
              type="button"
              onClick={() => openStory(storyIndex)}
              className="group shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Открыть story: ${story.title}`}
            >
              <div className={`rounded-full p-[2px] transition-transform duration-300 group-hover:scale-105 ${isViewed ? "bg-border" : "bg-primary"}`}>
                <div className="rounded-full bg-background p-[2px]">
                  <img
                    src={story.cover}
                    alt={story.title}
                    className="h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8"
                    loading="lazy"
                  />
                </div>
              </div>
            </button>
          );
        })}
      </motion.div>

      {typeof document !== "undefined" ? createPortal(viewer, document.body) : null}
    </>
  );
};

export default HeaderStories;
