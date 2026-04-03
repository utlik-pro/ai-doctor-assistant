import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">35 руб.</p>
          <p className="text-muted-foreground text-lg mb-8">Количество мест ограничено</p>

          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-6 rounded-full box-glow transition-all duration-300 hover:scale-105"
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              Регистрация по ссылке
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
