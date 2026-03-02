# Dhamini Gowda's Digital Marketing Blog

## Current State
Fresh project with no App.tsx or page components. Only shadcn UI primitives and React boilerplate are present. No backend data models exist yet.

## Requested Changes (Diff)

### Add
- A blog application with navigation between pages: Home (blog listing), About, and individual blog post view.
- About page that introduces Dhamini Gowda as a Digital Marketing and SEO intern building practical knowledge through this blog. Content should include her name, role/title, a short bio explaining her background as an intern learning digital marketing and SEO, what the blog covers (practical insights, learnings from hands-on work), and a call to action to explore posts.
- Blog post data model in backend (title, content/body, author, date, tags/category, slug or ID).
- Home page listing blog posts with title, date, short excerpt, and a "Read more" link.
- Individual blog post view page.
- Navigation bar with links to Home and About.
- Sample blog post seed data related to digital marketing and SEO topics.

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Generate Motoko backend with blog post data model (CRUD: create, read posts by ID and list all). Seed with 2-3 sample SEO/digital marketing posts.
2. Build React frontend:
   - App.tsx with client-side routing (Home, About, PostDetail pages)
   - Navbar component
   - HomePage listing posts from backend
   - AboutPage with Dhamini Gowda introduction
   - PostDetailPage rendering a single post
3. Wire backend actor calls in frontend using generated bindings.
4. Deploy.
