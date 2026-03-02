import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  BookOpen,
  Globe,
  LineChart,
  Megaphone,
  Search,
} from "lucide-react";
import { motion } from "motion/react";

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

const topics = [
  { icon: Search, label: "SEO Fundamentals" },
  { icon: BookOpen, label: "Content Marketing" },
  { icon: Globe, label: "Keyword Research" },
  { icon: BarChart2, label: "Google Analytics" },
  { icon: Megaphone, label: "Social Media Strategy" },
  { icon: LineChart, label: "Campaign Performance" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16" data-ocid="about.page">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page header */}
        <motion.div variants={itemVariants} className="mb-14">
          <p className="text-sm font-body font-medium tracking-widest uppercase text-primary mb-3">
            About the Author
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight mb-4">
            Hi, I&apos;m Dhamini Gowda
          </h1>
          <div className="h-1 w-16 bg-primary rounded-full" />
        </motion.div>

        {/* Profile section */}
        <motion.section
          variants={itemVariants}
          data-ocid="about.section"
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 mb-16 items-start"
        >
          {/* Profile image */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-5">
            <div className="relative">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-lg">
                <img
                  src="/assets/generated/dhamini-profile.dim_400x400.jpg"
                  alt="Dhamini Gowda"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-xl bg-primary/10 -z-10" />
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-lg bg-accent/40 -z-10" />
            </div>

            <div className="text-center lg:text-left">
              <p className="font-display text-xl font-semibold text-foreground">
                Dhamini Gowda
              </p>
              <Badge
                variant="secondary"
                className="mt-2 font-body text-xs tracking-wide px-3 py-1"
              >
                Digital Marketing &amp; SEO Intern
              </Badge>
            </div>
          </div>

          {/* Bio content */}
          <div className="lg:col-span-3 space-y-5">
            <p className="font-body text-foreground text-base leading-relaxed">
              I&apos;m a Digital Marketing and SEO intern actively building
              practical knowledge through hands-on work. This blog is where I
              document my learning journey — from understanding search engine
              algorithms and keyword research to crafting content strategies and
              analyzing campaign performance.
            </p>
            <p className="font-body text-muted-foreground text-base leading-relaxed">
              Through writing, I deepen my understanding and share insights that
              may help others navigating the world of digital marketing. Every
              post is a mix of what I&apos;ve tested, what surprised me, and
              what I wish someone had told me earlier.
            </p>
            <p className="font-body text-muted-foreground text-base leading-relaxed">
              Whether you&apos;re a fellow intern trying to make sense of
              organic search, a marketer leveling up your analytics skills, or
              just curious about how brands show up online — you&apos;re in the
              right place.
            </p>
          </div>
        </motion.section>

        {/* What this blog covers */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="bg-card border border-border rounded-2xl p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              What You&apos;ll Find Here
            </h2>
            <p className="font-body text-muted-foreground mb-8 text-sm">
              Practical insights drawn from real internship experience
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/60 border border-border hover:bg-primary/6 hover:border-primary/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-body text-sm font-medium text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Closing CTA */}
        <motion.section
          variants={itemVariants}
          className="text-center py-12 px-8 rounded-2xl bg-gradient-to-br from-primary/8 via-accent/10 to-primary/5 border border-primary/15"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            Let&apos;s Explore Together
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto mb-7 leading-relaxed">
            Dive into the posts and let&apos;s navigate the ever-changing
            landscape of digital marketing side by side. There&apos;s always
            something new to discover.
          </p>
          <Button
            onClick={() => onNavigate("/")}
            className="font-body font-medium px-8 h-11"
          >
            Browse All Posts
          </Button>
        </motion.section>
      </motion.div>
    </main>
  );
}
