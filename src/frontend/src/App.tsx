import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useActor } from "@/hooks/useActor";
import { AboutPage } from "@/pages/AboutPage";
import { HomePage } from "@/pages/HomePage";
import { PostDetailPage } from "@/pages/PostDetailPage";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// Parse a route string like "/post/123" into { page, param }
function parseRoute(path: string): { page: string; param?: string } {
  if (path === "/" || path === "") return { page: "home" };
  if (path === "/about") return { page: "about" };
  const postMatch = path.match(/^\/post\/(.+)$/);
  if (postMatch) return { page: "post", param: postMatch[1] };
  return { page: "home" };
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState("/");
  const { actor, isFetching } = useActor();

  // Initialize seed data once actor is ready
  useEffect(() => {
    if (!actor || isFetching) return;
    actor.initSeedData().catch(() => {
      // silently ignore if already initialized
    });
  }, [actor, isFetching]);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { page, param } = parseRoute(currentRoute);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {page === "home" && <HomePage onNavigate={handleNavigate} />}
            {page === "about" && <AboutPage onNavigate={handleNavigate} />}
            {page === "post" && param && (
              <PostDetailPage postId={param} onNavigate={handleNavigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
