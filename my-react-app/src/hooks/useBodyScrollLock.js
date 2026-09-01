import { useEffect } from "react";

let lockCount = 0;
let savedScrollY = 0;
let savedStyles = null;

export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    if (lockCount === 0) {
      savedScrollY = window.scrollY;

      savedStyles = {
        htmlOverflow: document.documentElement.style.overflow,
        htmlOverscrollBehavior: document.documentElement.style.overscrollBehavior,
        htmlScrollBehavior: document.documentElement.style.scrollBehavior,
        bodyPosition: document.body.style.position,
        bodyTop: document.body.style.top,
        bodyLeft: document.body.style.left,
        bodyRight: document.body.style.right,
        bodyWidth: document.body.style.width,
        bodyOverflow: document.body.style.overflow,
        bodyTouchAction: document.body.style.touchAction,
      };

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
      document.documentElement.style.scrollBehavior = "auto";

      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);

      if (lockCount !== 0 || !savedStyles) return;

      const scrollY = savedScrollY;

      document.documentElement.style.overflow = savedStyles.htmlOverflow;
      document.documentElement.style.overscrollBehavior = savedStyles.htmlOverscrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      document.body.style.position = savedStyles.bodyPosition;
      document.body.style.top = savedStyles.bodyTop;
      document.body.style.left = savedStyles.bodyLeft;
      document.body.style.right = savedStyles.bodyRight;
      document.body.style.width = savedStyles.bodyWidth;
      document.body.style.overflow = savedStyles.bodyOverflow;
      document.body.style.touchAction = savedStyles.bodyTouchAction;

      // Restore immediately without smooth-scroll animation.
      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: "instant",
      });

      // Keep the original scroll-behavior setting after restoration.
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = savedStyles?.htmlScrollBehavior ?? "";
        savedStyles = null;
      });
    };
  }, [locked]);
}
