import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-[auto_1fr] gap-16 items-center max-md:grid-cols-1">
          <div className="relative max-md:flex max-md:justify-center">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-teal to-yellow opacity-20 -rotate-3 scale-[1.03]" />
            <Image src="https://static.wixstatic.com/media/c183ff_89b4aee7650643cb9f75653b8ce2533f~mv2.jpg/v1/fill/w_600,h_600,al_c,q_90/oren.jpg"
              alt="אורן ראובן לב" width={300} height={340}
              className="relative z-10 w-[300px] h-[340px] object-cover rounded-3xl shadow-2xl" />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal bg-teal/10 border border-teal/20 px-3.5 py-1.5 rounded-full mb-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-teal">
              מי אני?
            </span>
            <h2 className="text-[clamp(26px,4vw,38px)] font-black text-dark mb-1">אורן ראובן לב</h2>
            <p className="text-teal font-semibold text-lg mb-5">מייסד מיכמוני</p>
            <p className="text-[17px] leading-relaxed text-mid mb-3">בן 42 מתל אביב. עו"ד במקצועי עד שבחרתי להיות אמיץ וללכת לכיוון שתמיד חיכה לי.</p>
            <p className="text-[17px] leading-relaxed text-mid mb-3">ה-&quot;למה&quot; שלי פשוט — שכל ילד בישראל ירגיש, יאמין וידע שהוא חכם, מוכשר ויפה.</p>
            <p className="text-[17px] leading-relaxed text-mid mb-6">כיום אני מעביר קורסים, הפעלות ופעילויות קהילתיות — ומלווה הורים עם כלים מעולמות NLP, CBT ופסיכולוגיה חיובית.</p>
            <Link href="https://www.micamoni.com" target="_blank"
              className="inline-flex items-center gap-2 text-teal font-bold border-b-2 border-teal pb-0.5 hover:opacity-60 transition-opacity">
              קרא עוד על אורן
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
