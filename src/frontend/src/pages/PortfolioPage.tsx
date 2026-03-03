import { Calendar, Tag, X } from "lucide-react";
import { useState } from "react";
import type { Project } from "../backend.d.ts";
import { AnimatedSection } from "../components/AnimatedSection";
import { SkeletonGrid } from "../components/SkeletonCard";
import { useMetaTags } from "../hooks/useMetaTags";
import { useGetAllProjects } from "../hooks/useQueries";

const categoryLabels: Record<string, string> = {
  all: "All",
  livingRoom: "Living Room",
  bedroom: "Bedroom",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  office: "Office",
  commercial: "Commercial",
};

const categories = [
  "all",
  "livingRoom",
  "bedroom",
  "kitchen",
  "bathroom",
  "office",
  "commercial",
];

const projectImageMap: Record<string, string> = {
  livingRoom: "/assets/generated/project-dining.dim_800x600.jpg",
  bedroom: "/assets/generated/project-bedroom.dim_800x600.jpg",
  office: "/assets/generated/project-office.dim_800x600.jpg",
  bathroom: "/assets/generated/project-bathroom.dim_800x600.jpg",
  kitchen: "/assets/generated/project-kitchen.dim_800x600.jpg",
  commercial: "/assets/generated/project-office.dim_800x600.jpg",
};

function getProjectImage(project: Project): string {
  if (project.images.length > 0) {
    const img = project.images[0];
    for (const [key, val] of Object.entries({
      dining: "/assets/generated/project-dining.dim_800x600.jpg",
      bedroom: "/assets/generated/project-bedroom.dim_800x600.jpg",
      office: "/assets/generated/project-office.dim_800x600.jpg",
      bathroom: "/assets/generated/project-bathroom.dim_800x600.jpg",
      kitchen: "/assets/generated/project-kitchen.dim_800x600.jpg",
    })) {
      if (img.toLowerCase().includes(key)) return val;
    }
  }
  return (
    projectImageMap[project.category] ??
    "/assets/generated/project-dining.dim_800x600.jpg"
  );
}

function LightboxModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm w-full h-full max-w-full max-h-full m-0 border-none"
      data-ocid="portfolio.lightbox.modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      aria-modal="true"
    >
      <div className="relative bg-background rounded-3xl overflow-hidden max-w-3xl w-full shadow-luxury animate-fade-up">
        <button
          type="button"
          onClick={onClose}
          data-ocid="portfolio.lightbox.close_button"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-foreground/80 backdrop-blur-sm text-background flex items-center justify-center hover:bg-gold transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={getProjectImage(project)}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-gold/10 border border-gold/20 text-gold text-[10px] tracking-[0.15em] uppercase font-semibold rounded-full flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              {categoryLabels[project.category] ?? project.category}
            </span>
            <span className="px-3 py-1 bg-muted text-muted-foreground text-[10px] tracking-[0.15em] uppercase font-semibold rounded-full flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {String(project.year)}
            </span>
          </div>
          <h2 className="font-display text-3xl font-light text-foreground mb-4">
            {project.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </dialog>
  );
}

export function PortfolioPage() {
  useMetaTags({
    title: "Portfolio",
    description:
      "Explore Maison Elara's portfolio of award-winning interior design projects — from luxury residences to bespoke commercial spaces.",
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { data: projects, isLoading } = useGetAllProjects();

  const filtered =
    activeCategory === "all"
      ? (projects ?? [])
      : (projects ?? []).filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <div className="pt-32 pb-16 px-6 text-center bg-beige dark:bg-muted/20">
        <AnimatedSection>
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Our Portfolio
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-foreground mb-4">
            Projects
          </h1>
          <div className="w-16 h-px bg-gold mx-auto" />
        </AnimatedSection>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-8 border-b border-border bg-background sticky top-[4.5rem] z-30 shadow-soft">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat, i) => (
            <button
              key={cat}
              type="button"
              data-ocid={`portfolio.filter.tab.${i + 1}`}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2 rounded-full text-xs tracking-[0.12em] uppercase font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gold text-white shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonGrid count={6} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24" data-ocid="portfolio.empty_state">
            <p className="font-display text-2xl text-muted-foreground mb-2">
              No projects found
            </p>
            <p className="text-sm text-muted-foreground">
              Try selecting a different category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((project, i) => (
              <AnimatedSection key={String(project.id)} delay={i * 80}>
                <button
                  type="button"
                  data-ocid={`portfolio.item.${i + 1}`}
                  onClick={() => setSelectedProject(project)}
                  className="group block w-full text-left rounded-3xl overflow-hidden bg-card border border-border/60 card-resting cursor-pointer"
                >
                  {/* Taller 2:3 image for editorial presence */}
                  <div className="relative aspect-[2/3] overflow-hidden bg-beige dark:bg-muted/20">
                    <img
                      src={getProjectImage(project)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    {/* Persistent bottom vignette — deepens on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-500" />
                    {/* Category eyebrow slides up into view */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="eyebrow-secondary text-white/70 group-hover:text-white/95 transition-colors duration-300">
                        {categoryLabels[project.category]}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 pt-5 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 font-medium">
                        {String(project.year)}
                      </p>
                      <span className="w-4 h-px bg-gold/40 group-hover:w-8 transition-all duration-500" />
                    </div>
                    <h3 className="font-display text-2xl font-normal text-foreground group-hover:text-gold transition-colors duration-300 title-hover-rule leading-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {selectedProject && (
        <LightboxModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}
