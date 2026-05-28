import { useLenis } from "lenis/react";
import { useEffect } from "react";

export const getScrollY = (lenis: ReturnType<typeof useLenis>) =>
  typeof lenis?.scroll === "number" ? lenis.scroll : window.scrollY;

/** Слушатель скролла: Lenis на премиум-странице, иначе window */
export const useLenisScrollListener = (onScroll: (y: number) => void, deps: unknown[] = []) => {
  const lenis = useLenis();

  useEffect(() => {
    const run = () => onScroll(getScrollY(lenis));

    if (lenis) {
      lenis.on("scroll", run);
      run();
      return () => {
        lenis.off("scroll", run);
      };
    }

    window.addEventListener("scroll", run, { passive: true });
    run();
    return () => window.removeEventListener("scroll", run);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis, ...deps]);
};
