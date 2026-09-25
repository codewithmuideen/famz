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
import { useSiteContent } from "../hooks/useSiteContent";

const fallbackSectors = [
  "Technology & Software",
  "E-commerce",
  "Financial Services",
  "Property & Real Estate",
  "Construction",
  "Healthcare",
  "Retail & Hospitality",
  "Start-ups & Scale-ups",
];

const logoCloudDefaults = { label: "Sectors we work with", items: fallbackSectors };

export default function Home() {
  const { content: logoCloud } = useSiteContent("home", "logoCloud", logoCloudDefaults);

  return (
    <>
      <Seo path="/" />
      <Hero />
      <LogoCloud items={logoCloud.items} label={logoCloud.label} />
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
