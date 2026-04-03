import logoAlba from "@/assets/logo-alba.png";

const EventFooter = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-6 mb-4">
          <span className="font-bold text-foreground text-lg">PRO себя</span>
          <span className="text-muted-foreground">×</span>
          <div className="flex items-center gap-2">
            <img src={logoAlba} alt="Alba lp" className="w-6 h-6 rounded" />
            <span className="font-semibold text-foreground">Alba lp</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Первый в Беларуси семинар на тему AI в практике врача
        </p>
        <a href="https://t.me/PRO_sebya_medbot" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
          Регистрация →
        </a>
      </div>
    </footer>
  );
};

export default EventFooter;
