const EventHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">PRO себя</span>
          <span className="text-sm text-muted-foreground hidden sm:inline">искусство быть собой</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Партнёры:</span>
            <span className="font-semibold text-foreground">Alba lp</span>
          </div>
          <a
            href="https://t.me/PRO_sebya_medbot"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 box-glow"
          >
            Зарегистрироваться
          </a>
        </div>
      </div>
    </header>
  );
};

export default EventHeader;
