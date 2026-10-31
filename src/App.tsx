import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Problems } from "./components/Problems";
import { System } from "./components/System";
import { Pricing } from "./components/Pricing";
import { Scorecard } from "./components/Scorecard";
import { HowItWorks } from "./components/HowItWorks";
import { Founder } from "./components/Founder";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { MobileCTA } from "./components/MobileCTA";

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Problems />
        <System />
        <Pricing />
        <Scorecard />
        <HowItWorks />
        <Founder />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
