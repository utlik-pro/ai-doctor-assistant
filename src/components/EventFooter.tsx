const EventFooter = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-6 mb-4">
          <span className="font-bold text-foreground text-lg">PRO себя</span>
          <span className="text-muted-foreground">×</span>
          <span className="font-semibold text-foreground">Alba lp</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Первый в Беларуси семинар на тему AI в практике врача
        </p>
        <a href="#" className="text-primary hover:underline text-sm font-medium">
          Регистрация →
        </a>
      </div>
    </footer>
  );
};

export default EventFooter;
