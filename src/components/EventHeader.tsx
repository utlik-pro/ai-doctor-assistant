import { Link } from "react-router-dom";
import logoAlba from "@/assets/logo-alba.png";

const EventHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-foreground">PRO себя</span>
          <Link
            to="/guide"
            className="hidden sm:inline-block text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Гайд участника →
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link
            to="/guide"
            className="sm:hidden text-primary hover:text-primary/80 transition-colors font-medium text-xs"
          >
            Гайд →
          </Link>
          <span className="hidden md:inline">Партнёры:</span>
          <div className="flex items-center gap-2">
            <img src={logoAlba} alt="Alba lp" className="w-6 h-6 rounded" />
            <span className="hidden sm:inline font-semibold text-foreground">Alba lp</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EventHeader;
