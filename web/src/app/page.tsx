import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TodaysDrop } from "@/components/TodaysDrop";
import { WornInBengaluru } from "@/components/WornInBengaluru";
import { Brands } from "@/components/Brands";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TodaysDrop />
        <WornInBengaluru />
        <Brands />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
