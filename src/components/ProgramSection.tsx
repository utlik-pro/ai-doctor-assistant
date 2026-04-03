import { Clock } from "lucide-react";

const programItems = [
  { time: "18:00–18:30", title: "Сбор гостей, кофепауза" },
  { time: "18:30–18:45", title: "Вступление" },
  { time: "18:45–20:10", title: "Практический блок (AI expert + врач)" },
  { time: "20:10–20:40", title: "Юридические аспекты" },
];

const ProgramSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16 text-glow">
          Программа семинара
        </h2>

        <div className="max-w-2xl mx-auto space-y-4">
          {programItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:box-glow"
            >
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-primary font-semibold text-sm md:text-base min-w-[120px]">{item.time}</span>
              <span className="text-foreground font-medium text-sm md:text-base">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
