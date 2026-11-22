import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import Photography from "@/components/sections/Photography";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Process />
      <Photography />
      <Writing />
      <Contact />
    </>
  );
}
