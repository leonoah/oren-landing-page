import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import Hero    from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import About   from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Add more sections here as you build them */}
        <About />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
