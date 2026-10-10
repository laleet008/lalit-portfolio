"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Cursor = dynamic(() => import("./Cursor"), { ssr: false });

/** Loads the custom cursor only for fine pointers without reduced motion. */
export function ClientExtras() {
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setCursor(mq.matches);
    const id = window.requestAnimationFrame(update);
    mq.addEventListener("change", update);
    return () => {
      window.cancelAnimationFrame(id);
      mq.removeEventListener("change", update);
    };
  }, []);

  return cursor ? <Cursor /> : null;
}
