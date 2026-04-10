import { Sparkles, CheckCircle } from "lucide-react";

const benefits = [
  "Живое демо на реальном клиническом кейсе",
  "Готовые промпты для ChatGPT и NotebookLM — можно применять с завтрашнего утра",
  "Юридический чеклист: как использовать ИИ и не нарушить закон",
  "Гайд «6 AI-инструментов для врача» — каждому участнику",
  "Нетворкинг с коллегами и AI-специалистами",
];

const HighlightSection = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto border border-primary/30 rounded-2xl p-8 md:p-12 border-glow bg-secondary/30 backdrop-blur-sm">
          <div className="text-center mb-8">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-6 animate-pulse-glow" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Мы покажем, как сократить до <span className="text-primary text-glow">2 часов в день</span> с помощью AI
            </h2>
          </div>
          <ul className="space-y-3 max-w-xl mx-auto">
            {benefits.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-cyan-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;
