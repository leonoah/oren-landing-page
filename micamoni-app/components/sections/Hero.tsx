"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => { imgRef.current?.classList.add("loaded"); }, []);

  return (
    // direction: ltr forces columns left→right regardless of RTL page direction
    <section style={{ height: "calc(100vh - 64px)", maxHeight: 780, display: "grid", gridTemplateColumns: "1fr 45%", overflow: "hidden", direction: "ltr" }}>

      {/* LEFT — content (first in DOM = left in ltr) */}
      <div className="flex flex-col justify-center bg-white" style={{ direction: "rtl", padding: "48px 64px" }}>
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal bg-teal/10 border border-teal/20 px-3.5 py-1.5 rounded-full w-fit mb-5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-teal">
          מועדון ההורים של מיכמוני
        </span>
        <h1 className="text-[clamp(28px,3.2vw,48px)] font-black leading-snug text-dark mb-5">
          לא מגדלים ילדים לבד<br/>
          <span className="text-teal">וביחד גדלים כהורים</span>
        </h1>
        <p className="text-[17px] leading-relaxed text-mid mb-9">
          מרחב שבועי קבוע בזום. מקום בטוח ללמוד, לשתף, לקבל כלים —
          ולהבין שאתם לא לבד.
        </p>
        <div className="flex flex-wrap gap-3.5 items-center">
          <Link href="#pricing"
            className="btn-ring bg-orange text-white font-black text-lg px-10 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg">
            הצטרפות עכשיו — 91 ₪ לחודש
          </Link>
          <Link href="#about"
            className="border-2 border-teal text-teal font-bold px-6 py-4 rounded-2xl hover:bg-teal hover:text-white transition-colors">
            היכרות עם אורן
          </Link>
        </div>
        <p className="text-xs text-[#8896a5] mt-3.5">בונוסים בשווי 519 ₪ · ביטול בכל עת</p>
      </div>
    </section>
  );
}
