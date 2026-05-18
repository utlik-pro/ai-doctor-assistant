import { Users, Laptop, Award } from "lucide-react";

const points = [
  {
    icon: Users,
    title: "Только для врачей",
    text: "Закрытая группа до 35 человек. Без маркетологов, без админов клиник — только практикующие врачи.",
  },
  {
    icon: Laptop,
    title: "Каждый со своим ноутбуком",
    text: "Не лекция, а воркшоп. Каждый инструмент отрабатываете руками на своём железе и со своими кейсами.",
  },
  {
    icon: Award,
    title: "Сертификат и сообщество",
    text: "По итогу — сертификат участника и доступ в чат выпускников: обмен кейсами, новые промпты, поддержка.",
  },
];

const WorkshopFormat = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 text-glow">
          Формат
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:box-glow text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4 box-glow">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkshopFormat;
