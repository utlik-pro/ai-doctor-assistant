import { MapPin, Calendar } from "lucide-react";

const WorkshopCta = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">150 BYN</p>
          <p className="text-muted-foreground text-lg mb-6">
            Группа до 20 человек · количество мест ограничено
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-cyan-light mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>6 июня 2026 · 13:00–17:00</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Willing Hotel, ул. Ленина, 50, Минск</span>
            </div>
          </div>

          <a
            href="#registration"
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-4 rounded-full box-glow transition-all duration-300 hover:scale-105"
          >
            Зарегистрироваться
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkshopCta;
