import { HelpCircle } from "lucide-react";
import speakerPanevina from "@/assets/speaker-panevina.jpg";
import speakerUtlik from "@/assets/speaker-utlik.jpg";
import speakerZvontsov from "@/assets/speaker-zvontsov.jpg";

const speakers = [
  {
    name: "Паневина Елена",
    role: "Founder EVEREST MARKETING & PRO себя",
    description: "Маркетинг менеджер, CEO проекта PRO себя",
    about: "Откроет вечер обзором: как ИИ уже сегодня меняет медицину в Беларуси, России, Европе, США и Китае. Увидите, что технологии, которые кажутся невозможными — уже работают в реальных клиниках.",
    image: speakerPanevina,
  },
  {
    name: "Утлик Дмитрий",
    role: "AI Expert",
    description: "Фаундер и CEO в Utlik.Co | AI Expert | Глава M.AI.N — AI Community | Директор по инновациям AI разработки в группе компаний Белхард",
    about: "Проведёт живое демо: покажет, как конкретные инструменты — ChatGPT, NotebookLM, AI-транскрибатор — сокращают рутину на реальном приёме пациента. Без теории. Только практика и цифры.",
    image: speakerUtlik,
  },
  {
    name: "Секретный спикер",
    role: "Доктор",
    description: "Доктор",
    image: null,
  },
  {
    name: "Звонцов Александр",
    role: "Юрист",
    description: "Юрист корпоративного права, компания Alba llp",
    about: "Разберёт юридическую сторону вопроса, которую нельзя игнорировать: ответственность врача, обезличивание данных, согласие на обработку и нормативная база РБ.",
    image: speakerZvontsov,
  },
];

const SpeakersSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16 text-glow">
          Спикеры
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {speakers.map((speaker, i) => (
            <div key={i} className="flex gap-5 p-5 rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:box-glow group">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-primary/40 flex-shrink-0 box-glow transition-all duration-300 group-hover:border-primary/80">
                {speaker.image ? (
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <HelpCircle className="w-12 h-12 text-primary animate-pulse-glow" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-foreground text-base mb-1">{speaker.name}</h3>
                <p className="text-primary text-xs md:text-sm font-medium mb-1">{speaker.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-2">{speaker.description}</p>
                {speaker.about && (
                  <p className="text-cyan-light text-xs leading-relaxed">{speaker.about}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
