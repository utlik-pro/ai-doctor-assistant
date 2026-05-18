import EventHeader from "@/components/EventHeader";
import EventFooter from "@/components/EventFooter";
import RegistrationSection from "@/components/RegistrationSection";
import WorkshopHero from "@/components/workshop/WorkshopHero";
import WorkshopHighlight from "@/components/workshop/WorkshopHighlight";
import WorkshopTools from "@/components/workshop/WorkshopTools";
import WorkshopFormat from "@/components/workshop/WorkshopFormat";
import WorkshopProgram from "@/components/workshop/WorkshopProgram";
import WorkshopCta from "@/components/workshop/WorkshopCta";

const Workshop = () => {
  return (
    <div className="min-h-screen gradient-navy">
      <EventHeader />
      <WorkshopHero />
      <WorkshopHighlight />
      <WorkshopTools />
      <WorkshopFormat />
      <WorkshopProgram />
      <WorkshopCta />
      <RegistrationSection
        eventName="Воркшоп «AI-ассистент врача»"
        eventDate="6 июня 2026, 13:00–17:00"
        totalAmount="150,00 BYN"
        title="Регистрация на воркшоп"
        subtitle="Только для практикующих врачей · 6 июня 2026 · Willing Hotel, Минск"
        submitLabel="Записаться на воркшоп"
      />
      <EventFooter />
    </div>
  );
};

export default Workshop;
