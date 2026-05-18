import { BookOpen, MessageSquare, Image as ImageIcon, Wand2 } from "lucide-react";

const tools = [
  {
    icon: BookOpen,
    name: "NotebookLM",
    tagline: "Работа с медицинской литературой и протоколами",
    bullets: [
      "Загружаем PDF клинических протоколов и научных статей — получаем выжимку за минуту",
      "Задаём вопросы по своей базе знаний и получаем ответ со ссылкой на источник",
      "Готовим памятки для пациента на основании актуальных рекомендаций",
    ],
  },
  {
    icon: MessageSquare,
    name: "ChatGPT",
    tagline: "Ведение пациентов, заключения, рутина",
    bullets: [
      "Структурируем жалобы и анамнез в готовую карту приёма",
      "Получаем второе мнение по диф. диагнозу за 30 секунд",
      "Шаблоны заключений, направлений и писем — без копирования из старых файлов",
    ],
  },
  {
    icon: ImageIcon,
    name: "Nano Banana",
    tagline: "Визуализация и иллюстрации для пациентов",
    bullets: [
      "Объясняющие схемы для пациента — анатомия, ход операции, режим приёма препарата",
      "Иллюстрации к памяткам и постам — без стоков и Photoshop",
      "Быстрая адаптация изображений под формат соцсетей и презентаций",
    ],
  },
  {
    icon: Wand2,
    name: "Промпт-инжиниринг для врача",
    tagline: "Как формулировать запросы, чтобы получать точные клинические ответы",
    bullets: [
      "Базовая структура промпта: роль, контекст, задача, формат ответа",
      "Готовые шаблоны промптов под типовые задачи врача",
      "Как избежать галлюцинаций и проверить ответ ИИ",
    ],
  },
];

const WorkshopTools = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4 text-glow">
          Что освоите за 4 часа
        </h2>
        <p className="text-center text-cyan-light max-w-2xl mx-auto mb-16">
          Все кейсы и примеры — из реальной практики врача. Каждый инструмент отрабатываем на ноутбуке участника.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:box-glow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 box-glow">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg leading-tight">{tool.name}</h3>
                    <p className="text-cyan-light text-sm mt-1">{tool.tagline}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-1">
                  {tool.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkshopTools;
