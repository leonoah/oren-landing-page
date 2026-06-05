"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const taglines = [
  { text: "הזדהות יוצרת הזדמנות",  color: "#298c9c", font: "var(--font-heebo)" },
  { text: "לא מגדלים ילדים לבד",    color: "#ea6c3a", font: "Georgia, serif" },
  { text: "הורות היא מסע, לא יעד",  color: "#8a6600", font: "Courier New, monospace" },
  { text: "ביחד גדלים כהורים",       color: "#298c9c", font: "var(--font-heebo)" },
];

export default function Navbar() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % taglines.length); setVisible(true); }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const t = taglines[idx];

  return (
    <nav className="sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Image src="/micamoni-logo.jpeg" alt="מיכמוני" width={120} height={38} className="h-10 w-auto object-contain" priority />

        <p className="flex-1 text-center text-sm font-bold hidden md:block transition-all duration-400"
           style={{ color: t.color, fontFamily: t.font, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(6px)" }}>
          {t.text}
        </p>

        <Link href="#pricing"
          className="flex-shrink-0 bg-orange text-white font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow">
          הצטרפות למועדון
        </Link>
      </div>
    </nav>
  );
}
