import { PenLine } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Blog Title */}
        <button
          type="button"
          onClick={() => onNavigate("/")}
          className="flex items-center gap-2.5 group"
          data-ocid="nav.home_link"
        >
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
          >
            <PenLine className="w-4 h-4 text-primary-foreground" />
          </motion.div>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            Dhamini&apos;s Digital Marketing Blog
          </span>
        </button>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          <NavLink
            label="Home"
            route="/"
            currentRoute={currentRoute}
            onNavigate={onNavigate}
            dataOcid="nav.home_link"
          />
          <NavLink
            label="About"
            route="/about"
            currentRoute={currentRoute}
            onNavigate={onNavigate}
            dataOcid="nav.about_link"
          />
        </nav>
      </div>
    </header>
  );
}

interface NavLinkProps {
  label: string;
  route: string;
  currentRoute: string;
  onNavigate: (route: string) => void;
  dataOcid: string;
}

function NavLink({
  label,
  route,
  currentRoute,
  onNavigate,
  dataOcid,
}: NavLinkProps) {
  const isActive = currentRoute === route;

  return (
    <button
      type="button"
      onClick={() => onNavigate(route)}
      data-ocid={dataOcid}
      className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}
