import { HelpCircle } from "lucide-react";
import speakerPanevina from "@/assets/speaker-panevina.jpg";
import speakerUtlik from "@/assets/speaker-utlik.jpg";
import speakerZvontsov from "@/assets/speaker-zvontsov.jpg";

const speakers = [
  {
    name: "Паневина Елена",
    role: "Founder EVEREST MARKETING & PRO себя",
    description: "Маркетинг менеджер, CEO проекта PRO себя",
    image: speakerPanevina,
  },
  {
    name: "Утлик Дмитрий",
    role: "AI Expert",
    description: "Фаундер и CEO в Utlik.Co | AI Expert | Глава M.AI.N — AI Community | Директор по инновациям AI разработки в группе компаний Белхард",
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {speakers.map((speaker, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/40 mb-4 box-glow transition-all duration-300 group-hover:border-primary/80 group-hover:scale-105">
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
              <h3 className="font-bold text-foreground text-sm md:text-base mb-1">{speaker.name}</h3>
              <p className="text-primary text-xs md:text-sm font-medium mb-2">{speaker.role}</p>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px]">{speaker.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
