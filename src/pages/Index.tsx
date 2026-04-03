import EventHeader from "@/components/EventHeader";
import HeroSection from "@/components/HeroSection";
import SpeakersSection from "@/components/SpeakersSection";
import HighlightSection from "@/components/HighlightSection";
import ProgramSection from "@/components/ProgramSection";
import CtaSection from "@/components/CtaSection";
import EventFooter from "@/components/EventFooter";

const Index = () => {
  return (
    <div className="min-h-screen gradient-navy">
      <EventHeader />
      <HeroSection />
      <SpeakersSection />
      <HighlightSection />
      <ProgramSection />
      <CtaSection />
      <EventFooter />
    </div>
  );
};

export default Index;
