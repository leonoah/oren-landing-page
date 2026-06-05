import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["300","400","500","600","700","800","900"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "מועדון ההורים של מיכמוני — לא מגדלים ילדים לבד",
  description: "מרחב שבועי קבוע בזום. מקום בטוח ללמוד, לשתף, לקבל כלים. 91 ₪ לחודש.",
  openGraph: {
    title: "מועדון ההורים של מיכמוני",
    description: "לא מגדלים ילדים לבד וביחד גדלים כהורים",
    siteName: "מיכמוני",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
