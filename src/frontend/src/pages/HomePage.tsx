import type { BlogPost } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPosts } from "@/hooks/useQueries";
import { ArrowRight, Calendar, Folder } from "lucide-react";
import { motion } from "motion/react";

interface HomePageProps {
  onNavigate: (route: string) => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export function HomePage({ onNavigate }: HomePageProps) {
  const { data: posts, isLoading, isError } = useGetAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-6 py-12" data-ocid="home.page">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 relative overflow-hidden rounded-2xl"
      >
        <div
          className="relative min-h-[280px] sm:min-h-[320px] flex flex-col justify-end p-8 sm:p-12"
          style={{
            backgroundImage: `url('/assets/generated/hero-digital-marketing.dim_1200x400.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.025_45/0.85)] via-[oklch(0.22_0.025_45/0.35)] to-transparent" />
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm font-body font-medium tracking-widest uppercase text-[oklch(0.88_0.06_65)] mb-3"
            >
              Digital Marketing & SEO
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-3xl sm:text-5xl font-semibold text-white leading-tight mb-4 text-balance"
            >
              Learning Marketing
              <br className="hidden sm:block" /> One Post at a Time
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="font-body text-[oklch(0.88_0.01_75)] max-w-lg"
            >
              A hands-on intern&apos;s journal of SEO experiments, content
              strategies, and digital marketing discoveries.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Posts Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Latest Posts
          </h2>
          <span className="text-sm text-muted-foreground font-body">
            {posts && !isLoading ? `${posts.length} articles` : ""}
          </span>
        </div>

        {isLoading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="home.loading_state"
          >
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
              <Card key={sk} className="overflow-hidden">
                <Skeleton className="h-4 w-20 m-6 mb-2" />
                <CardHeader className="pt-0">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-28" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="home.error_state"
          >
            <p className="font-body">
              Failed to load posts. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !isError && posts && posts.length === 0 && (
          <div
            className="text-center py-24 border border-dashed border-border rounded-2xl"
            data-ocid="home.empty_state"
          >
            <p className="font-display text-2xl font-semibold text-muted-foreground mb-2">
              No posts yet
            </p>
            <p className="font-body text-muted-foreground text-sm">
              Check back soon for new articles!
            </p>
          </div>
        )}

        {!isLoading && posts && posts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post, index) => (
              <PostCard
                key={post.id.toString()}
                post={post}
                index={index + 1}
                onNavigate={onNavigate}
              />
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}

interface PostCardProps {
  post: BlogPost;
  index: number;
  onNavigate: (route: string) => void;
}

function PostCard({ post, index, onNavigate }: PostCardProps) {
  const formattedDate = new Date(post.datePublished).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <motion.div variants={cardVariants} data-ocid={`home.post_item.${index}`}>
      <Card className="h-full flex flex-col overflow-hidden group hover:shadow-md transition-shadow duration-300 border-border bg-card">
        {/* Category label */}
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body font-medium tracking-wide uppercase">
            <Folder className="w-3 h-3" />
            <span>{post.category}</span>
          </div>
        </div>

        <CardHeader className="pb-3">
          <h3 className="font-display text-lg font-semibold text-card-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body mt-1">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pb-4">
          <p className="text-sm font-body text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-body px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate(`/post/${post.id.toString()}`)}
            data-ocid={`home.post_read_button.${index}`}
            className="group/btn text-primary hover:text-primary hover:bg-primary/8 -ml-2 font-body font-medium"
          >
            Read More
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
