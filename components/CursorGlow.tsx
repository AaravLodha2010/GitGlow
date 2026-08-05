"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };
    const onLeave = () => {
      setPosition({ x: -500, y: -500 });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full bg-[#d7ff54]/[0.03] blur-[120px] transition-transform duration-75"
        style={{
          left: position.x - 200,
          top: position.y - 200,
          width: 400,
          height: 400,
          transform: "translate3d(0,0,0)",
        }}
      />
    </div>
  );
}