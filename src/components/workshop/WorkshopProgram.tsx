import { Clock } from "lucide-react";

const programItems = [
  {
    time: "13:00–13:15",
    title: "Сбор участников, кофе, настройка ноутбука",
    description: "Проверяем, что у каждого работают ChatGPT, NotebookLM и Nano Banana. Раздаём список аккаунтов и доступов.",
  },
  {
    time: "13:15–14:00",
    title: "Блок 1. Промпт-инжиниринг для врача",
    description: "Базовая структура промпта и как ИИ «думает». На выходе у каждого участника — свой личный шаблон промпта под его специализацию.",
    list: [
      "Роль, контекст, задача, формат — 4 элемента надёжного промпта",
      "Типичные ошибки и как они приводят к галлюцинациям",
      "Практика: переписываем 3 «плохих» промпта в «рабочие»",
    ],
  },
  {
    time: "14:00–14:45",
    title: "Блок 2. ChatGPT в ведении пациента",
    description: "Реальный кейс пациента — от жалобы до заключения. Каждый этап параллельно делаем у себя в ноутбуке.",
    list: [
      "Структурируем жалобы и анамнез",
      "Подбираем диф. диагнозы и обоснование",
      "Готовим заключение и рекомендации в нужном формате",
    ],
  },
  {
    time: "14:45–15:00",
    title: "Кофе-пауза",
  },
  {
    time: "15:00–15:45",
    title: "Блок 3. NotebookLM — ваша личная база знаний",
    description: "Собираем свой «второй мозг» из протоколов, клинических рекомендаций и научных статей.",
    list: [
      "Загружаем PDF и делаем выжимку с цитатами",
      "Готовим памятку для пациента на основании протокола",
      "Задаём вопросы по базе и получаем ответ со ссылкой на источник",
    ],
  },
  {
    time: "15:45–16:30",
    title: "Блок 4. Nano Banana — визуализация для пациента и соцсетей",
    description: "Создаём схемы, иллюстрации и обложки без дизайнера и Photoshop.",
    list: [
      "Объясняющая схема для пациента (анатомия, ход процедуры)",
      "Иллюстрация к памятке",
      "Картинка к посту в Instagram / Telegram",
    ],
  },
  {
    time: "16:30–17:00",
    title: "Q&A, разбор кейсов участников, сертификаты",
    description: "Каждый участник приносит свой кейс — разбираем вместе, оптимизируем промпты, отвечаем на вопросы.",
  },
];

const WorkshopProgram = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4 text-glow">
          Программа воркшопа
        </h2>
        <p className="text-center text-cyan-light max-w-2xl mx-auto mb-16">
          4 часа практики · 4 рабочих блока · ноутбук обязателен
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {programItems.map((item, i) => (
            <div
              key={i}
              className="p-4 md:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:box-glow"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-primary font-semibold text-sm md:text-base min-w-[120px]">
                  {item.time}
                </span>
                <span className="text-foreground font-medium text-sm md:text-base">
                  {item.title}
                </span>
              </div>

              {item.description && (
                <p className="text-muted-foreground text-sm mt-3 ml-11 md:ml-[3.25rem]">
                  {item.description}
                </p>
              )}

              {item.list && (
                <ul className="mt-3 ml-11 md:ml-[3.25rem] space-y-1">
                  {item.list.map((li, j) => (
                    <li
                      key={j}
                      className="text-muted-foreground text-sm flex items-start gap-2"
                    >
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

export default WorkshopProgram;
