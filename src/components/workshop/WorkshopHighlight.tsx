import { Sparkles, CheckCircle } from "lucide-react";

const benefits = [
  "Личный ноутбук участника — всё отрабатываем руками, не «смотрим презентацию»",
  "Готовый набор промптов под клиническую практику — можно применять с понедельника",
  "Шаблоны памяток для пациента в NotebookLM",
  "Чек-лист: что можно и что нельзя загружать в ИИ-сервисы при работе с данными пациента",
  "Сертификат участника воркшопа",
  "Группа выпускников для обмена кейсами после воркшопа",
];

const WorkshopHighlight = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto border border-primary/30 rounded-2xl p-8 md:p-12 border-glow bg-secondary/30 backdrop-blur-sm">
          <div className="text-center mb-8">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-6 animate-pulse-glow" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Не лекция. <span className="text-primary text-glow">Практический воркшоп</span> с результатом на выходе
            </h2>
            <p className="text-cyan-light text-sm md:text-base max-w-xl mx-auto">
              К концу дня вы уйдёте не с конспектом, а с настроенными инструментами и шаблонами, готовыми к работе
            </p>
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

export default WorkshopHighlight;
