import { Clock } from "lucide-react";

const programItems = [
  {
    time: "18:00–18:30",
    title: "Сбор гостей, кофепауза",
  },
  {
    time: "18:30–18:45",
    title: "Вступление",
    description: "ИИ в медицине сегодня: что уже работает в СНГ, Европе, США и Китае. Обзор от организатора проекта PRO себя — Паневиной Елены.",
  },
  {
    time: "18:45–20:10",
    title: "Практический блок: приём пациента с возможностями ИИ (живое демо)",
    description: "Один реальный пациент — от первой жалобы до готовой памятки. Каждый этап приёма разбирается вживую: врач и AI-эксперт показывают, где теряется время и как ИИ его возвращает.",
    table: [
      { stage: "Фиксация и структуризация жалоб", tool: "AI-транскрибатор", benefit: "3–5 мин экономии на каждом приёме" },
      { stage: "Анализ анамнеза и симптомов", tool: "ChatGPT", benefit: "Структурированная карта пациента" },
      { stage: "Подбор диф. диагнозов", tool: "ChatGPT + промпт", benefit: "Второе мнение за 30 секунд" },
      { stage: "Создание памятки для пациента", tool: "NotebookLM", benefit: "Готовая памятка за 1 минуту" },
    ],
  },
  {
    time: "20:10–20:40",
    title: "Юридические аспекты: врач и ИИ — что должен знать каждый врач",
    description: "",
    list: [
      "Ответственность врача при использовании ИИ",
      "Обезличивание данных пациентов",
      "Как правильно получить согласие на обработку данных",
      "Нормативная база РБ и документы ВОЗ",
    ],
  },
];

const ProgramSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16 text-glow">
          Программа семинара
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {programItems.map((item, i) => (
            <div
              key={i}
              className="p-4 md:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:box-glow"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-primary font-semibold text-sm md:text-base min-w-[120px]">{item.time}</span>
                <span className="text-foreground font-medium text-sm md:text-base">{item.title}</span>
              </div>

              {item.description && (
                <p className="text-muted-foreground text-sm mt-3 ml-11 md:ml-[3.25rem]">{item.description}</p>
              )}

              {item.table && (
                <div className="mt-4 ml-11 md:ml-[3.25rem] overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="text-left text-primary">
                        <th className="pb-2 pr-4 font-semibold">Этап приёма</th>
                        <th className="pb-2 pr-4 font-semibold">Инструмент</th>
                        <th className="pb-2 font-semibold">Что даёт</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.table.map((row, j) => (
                        <tr key={j} className="border-t border-border/50">
                          <td className="py-2 pr-4 text-foreground">{row.stage}</td>
                          <td className="py-2 pr-4 text-cyan-light">{row.tool}</td>
                          <td className="py-2 text-muted-foreground">{row.benefit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {item.list && (
                <ul className="mt-3 ml-11 md:ml-[3.25rem] space-y-1">
                  {item.list.map((li, j) => (
                    <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
