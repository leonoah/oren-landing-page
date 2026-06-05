"use client";
import { useState } from "react";
import Link from "next/link";

const PAYMENT_URL = process.env.NEXT_PUBLIC_PAYMENT_URL ?? "#";

const included = [
  { text: "מפגש לייב שבועי עם אורן (כשעה)", gift: false },
  { text: "נושא מרכזי מדי שבוע", gift: false },
  { text: "שאלות ותשובות ותמיכה קהילתית", gift: false },
  { text: 'כלים מ-NLP, CBT ופסיכולוגיה של ילדים', gift: false },
  { text: 'ספר דיגיטלי "מקרב בין הורים וילדים" (שווי 119 ₪) — בחינם', gift: true },
  { text: "פגישת ייעוץ אישית עם אורן (שווי 400 ₪) — בחינם", gift: true },
];

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    if (PAYMENT_URL === "#") {
      alert("יש לחבר קישור סליקה ב-.env.local: NEXT_PUBLIC_PAYMENT_URL");
      return;
    }
    setLoading(true);
    // Option: call /api/subscribe first, then redirect
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "pricing_cta" }),
      });
      const data = await res.json();
      if (data.redirectUrl) window.location.href = data.redirectUrl;
      else window.location.href = PAYMENT_URL;
    } catch {
      window.location.href = PAYMENT_URL;
    }
  }

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="relative bg-light rounded-[28px] border border-border px-12 py-14 text-center overflow-hidden max-sm:px-6">
          {/* gradient top bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-l from-yellow via-teal to-orange rounded-t-[28px]" />

          <p className="text-xs font-bold uppercase tracking-widest text-teal mb-4">עלות חברות חודשית</p>
          <div className="text-7xl font-black text-dark leading-none mb-1">
            <sup className="text-3xl align-top mt-2.5">₪</sup>91
          </div>
          <p className="text-lg text-mid mb-9">לחודש · ביטול בכל עת</p>

          <hr className="border-border mb-8" />

          <ul className="text-right space-y-3.5 mb-10">
            {included.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-dark">
                <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black mt-0.5 ${item.gift ? "bg-yellow/20 text-[#8a6600]" : "bg-teal/10 text-teal"}`}>
                  {item.gift ? "★" : "✓"}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <button onClick={handleSubscribe} disabled={loading}
            className="btn-ring w-full bg-orange text-white font-black text-xl py-5 rounded-2xl hover:opacity-90 transition-opacity shadow-xl disabled:opacity-60">
            {loading ? "מעבד..." : "הצטרפות למועדון עכשיו"}
          </button>
          <p className="text-xs text-[#8896a5] mt-4">ביטול בכל עת · ללא התחייבות · פחות מ-3 ₪ ליום</p>
        </div>
      </div>
    </section>
  );
}
