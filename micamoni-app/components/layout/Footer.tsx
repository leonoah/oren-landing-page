import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "האתר הראשי",  href: "https://www.micamoni.com" },
  { label: "Facebook",    href: "https://www.facebook.com/oren.lev.3" },
  { label: "Instagram",   href: "https://www.instagram.com/orenlevv/" },
  { label: "TikTok",      href: "https://www.tiktok.com/@orenrlev" },
  { label: "micamonilev@gmail.com", href: "mailto:micamonilev@gmail.com" },
  { label: "050-4800-455", href: "tel:0504800455" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-14 pb-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-[1fr_auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-x-12 gap-y-8 items-center max-sm:grid-cols-1 max-sm:text-center">

          <div className="flex flex-col gap-2 max-sm:items-center">
            <Image src="/micamoni-logo.jpeg" alt="מיכמוני" width={120} height={38} className="h-10 w-auto object-contain" />
            <p className="text-sm text-mid leading-relaxed max-w-[220px]">
              לא מגדלים ילדים לבד<br/>וביחד גדלים כהורים
            </p>
          </div>

          <div className="w-px h-16 bg-border max-sm:hidden" />

          <nav className="flex flex-col gap-2.5 max-sm:items-center">
            {links.map(l => (
              <Link key={l.href} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="text-sm text-mid hover:text-teal transition-colors flex items-center gap-1.5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border before:hover:bg-teal">
                {l.label}
              </Link>
            ))}
          </nav>

          <p className="col-span-3 max-sm:col-span-1 text-xs text-[#b0bec5] border-t border-border pt-5 text-center">
            © 2025 מיכמוני — אורן ראובן לב. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
