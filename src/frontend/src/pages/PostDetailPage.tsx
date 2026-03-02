import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPost } from "@/hooks/useQueries";
import { ArrowLeft, Calendar, Folder, Tag, User } from "lucide-react";
import { motion } from "motion/react";

interface PostDetailPageProps {
  postId: string;
  onNavigate: (route: string) => void;
}

export function PostDetailPage({ postId, onNavigate }: PostDetailPageProps) {
  const id = BigInt(postId);
  const { data: post, isLoading, isError } = useGetPost(id);

  if (isLoading) {
    return (
      <main
        className="max-w-3xl mx-auto px-6 py-12"
        data-ocid="post.loading_state"
      >
        <Skeleton className="h-8 w-28 mb-10" />
        <Skeleton className="h-6 w-24 mb-4" />
        <Skeleton className="h-12 w-full mb-3" />
        <Skeleton className="h-12 w-3/4 mb-6" />
        <div className="flex gap-4 mb-10">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="space-y-3">
          {["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8"].map((sk) => (
            <Skeleton key={sk} className="h-4 w-full" />
          ))}
          <Skeleton className="h-4 w-2/3" />
        </div>
      </main>
    );
  }

  if (isError || post === null || post === undefined) {
    return (
      <main
        className="max-w-3xl mx-auto px-6 py-24 text-center"
        data-ocid="post.error_state"
      >
        <p className="font-display text-2xl font-semibold text-muted-foreground mb-3">
          Post not found
        </p>
        <p className="font-body text-muted-foreground text-sm mb-8">
          This article may have been removed or the link is incorrect.
        </p>
        <Button
          onClick={() => onNavigate("/")}
          variant="outline"
          className="font-body"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </main>
    );
  }

  const formattedDate = new Date(post.datePublished).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  // Split body into paragraphs for better rendering
  const paragraphs = post.body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12" data-ocid="post.page">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-10"
      >
        <Button
          variant="ghost"
          onClick={() => onNavigate("/")}
          data-ocid="post.back_button"
          className="font-body text-muted-foreground hover:text-foreground -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </Button>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Category */}
        <div className="flex items-center gap-1.5 text-xs text-primary font-body font-medium tracking-widest uppercase mb-4">
          <Folder className="w-3.5 h-3.5" />
          <span>{post.category}</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6 text-balance">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-body mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Excerpt / Lead */}
        {post.excerpt && (
          <p className="font-body text-base sm:text-lg text-foreground/80 leading-relaxed mb-8 font-medium italic border-l-2 border-primary pl-5">
            {post.excerpt}
          </p>
        )}

        {/* Body content */}
        <div className="space-y-5 font-body text-base text-foreground leading-relaxed">
          {paragraphs.length > 0 ? (
            paragraphs.map((para, i) => {
              // Use a stable key combining index and first 12 chars
              const stableKey = `p${i}-${para.slice(0, 12).replace(/\s/g, "_")}`;
              // Detect markdown-style headings
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={stableKey}
                    className="font-display text-2xl font-semibold text-foreground mt-10 mb-2"
                  >
                    {para.replace(/^## /, "")}
                  </h2>
                );
              }
              if (para.startsWith("# ")) {
                return (
                  <h2
                    key={stableKey}
                    className="font-display text-3xl font-semibold text-foreground mt-10 mb-2"
                  >
                    {para.replace(/^# /, "")}
                  </h2>
                );
              }
              // Bullet lists
              if (
                para
                  .split("\n")
                  .every(
                    (line) => line.startsWith("- ") || line.startsWith("* "),
                  )
              ) {
                return (
                  <ul
                    key={stableKey}
                    className="list-disc list-outside ml-5 space-y-2"
                  >
                    {para.split("\n").map((line) => (
                      <li
                        key={`${stableKey}-${line.slice(0, 10)}`}
                        className="text-foreground"
                      >
                        {line.replace(/^[-*] /, "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={stableKey} className="text-foreground/90">
                  {para}
                </p>
              );
            })
          ) : (
            <p className="text-foreground/90">{post.body}</p>
          )}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-body text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Bottom back button */}
        <div className="mt-16 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={() => onNavigate("/")}
            className="font-body"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Posts
          </Button>
        </div>
      </motion.article>
    </main>
  );
}
