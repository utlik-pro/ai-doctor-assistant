import { Sparkles } from "lucide-react";

const HighlightSection = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto border border-primary/30 rounded-2xl p-8 md:p-12 text-center border-glow bg-secondary/30 backdrop-blur-sm">
          <Sparkles className="w-10 h-10 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Мы покажем, как сократить до <span className="text-primary text-glow">2 часов в день</span> с помощью AI
          </h2>
          <p className="text-cyan-light text-lg font-medium mt-4">
            + Каждому участнику гайд «6 AI-инструментов для врача»
          </p>
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;
