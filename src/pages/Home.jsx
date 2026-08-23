import Seo from "../components/common/Seo";
import Hero from "../components/home/Hero";
import IntroSection from "../components/home/IntroSection";
import FeaturedServices from "../components/home/FeaturedServices";
import IndustriesSection from "../components/home/IndustriesSection";
import StatsSection from "../components/home/StatsSection";
import InsightsSection from "../components/home/InsightsSection";
import GlobalPresence from "../components/home/GlobalPresence";
import CareersCTA from "../components/home/CareersCTA";
import TestimonialSection from "../components/sections/TestimonialSection";
import LogoCloud from "../components/sections/LogoCloud";

const sectors = [
  "Technology & Software",
  "E-commerce",
  "Financial Services",
  "Property & Real Estate",
  "Construction",
  "Healthcare",
  "Retail & Hospitality",
  "Start-ups & Scale-ups",
];

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <LogoCloud items={sectors} />
      <IntroSection />
      <FeaturedServices />
      <StatsSection />
      <IndustriesSection />
      <TestimonialSection />
      <InsightsSection />
      <GlobalPresence />
      <CareersCTA />
    </>
  );
}
