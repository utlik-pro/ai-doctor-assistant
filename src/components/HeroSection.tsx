import { MapPin } from "lucide-react";
import heroDoctor from "@/assets/hero-doctor.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src={heroDoctor}
          alt="AI в медицине"
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center py-20">
        <p className="text-cyan-light text-sm md:text-base font-medium tracking-widest uppercase mb-6 animate-fade-in-up">
          Первый в Беларуси семинар на тему AI в практике врача
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground text-glow mb-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          ИИ-ассистент врача
        </h1>

        <p className="text-lg md:text-xl text-cyan-light max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Как нейросети помогают врачу экономить время и повышать качество работы
        </p>

        <div className="inline-flex items-center gap-4 bg-primary/20 border border-primary/40 rounded-full px-8 py-3 text-foreground font-semibold text-lg mb-6 animate-fade-in-up box-glow" style={{ animationDelay: '0.45s' }}>
          <span>13 мая 2026</span>
          <span className="text-primary">→</span>
          <span>18:00</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-lg">Ренессанс Минск Отель</span>
        </div>

        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.75s' }}>
          <a
            href="https://t.me/PRO_sebya_medbot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-4 rounded-full box-glow transition-all duration-300 hover:scale-105"
          >
            Зарегистрироваться
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
