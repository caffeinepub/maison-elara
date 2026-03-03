import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Home, Palette, Sparkles } from "lucide-react";
import type { ProjectCategory } from "../backend.d.ts";
import { AnimatedSection } from "../components/AnimatedSection";
import { useMetaTags } from "../hooks/useMetaTags";
import { useGetAllProjects } from "../hooks/useQueries";

const categoryLabels: Record<string, string> = {
  livingRoom: "Living Room",
  bedroom: "Bedroom",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  office: "Office",
  commercial: "Commercial",
};

const projectImages: Record<string, string> = {
  "project-dining": "/assets/generated/project-dining.dim_800x600.jpg",
  "project-bedroom": "/assets/generated/project-bedroom.dim_800x600.jpg",
  "project-office": "/assets/generated/project-office.dim_800x600.jpg",
  "project-bathroom": "/assets/generated/project-bathroom.dim_800x600.jpg",
  "project-kitchen": "/assets/generated/project-kitchen.dim_800x600.jpg",
};

function getCategoryImage(category: ProjectCategory, images: string[]): string {
  if (images.length > 0) {
    const img = images[0];
    for (const [key, val] of Object.entries(projectImages)) {
      if (img.includes(key)) return val;
    }
  }
  const categoryMap: Record<string, string> = {
    livingRoom: "/assets/generated/project-dining.dim_800x600.jpg",
    bedroom: "/assets/generated/project-bedroom.dim_800x600.jpg",
    office: "/assets/generated/project-office.dim_800x600.jpg",
    bathroom: "/assets/generated/project-bathroom.dim_800x600.jpg",
    kitchen: "/assets/generated/project-kitchen.dim_800x600.jpg",
    commercial: "/assets/generated/project-office.dim_800x600.jpg",
  };
  return (
    categoryMap[category] ?? "/assets/generated/project-dining.dim_800x600.jpg"
  );
}

const serviceHighlights = [
  {
    icon: Home,
    title: "Residential Design",
    desc: "Crafting homes that reflect your personal story and lifestyle.",
  },
  {
    icon: Palette,
    title: "Bespoke Interiors",
    desc: "Custom furniture, art curation, and material selection.",
  },
  {
    icon: Award,
    title: "Project Management",
    desc: "Full-service coordination from concept to final reveal.",
  },
];

export function HomePage() {
  useMetaTags({
    title: "Luxury Interior Design Studio",
    description:
      "Maison Elara — award-winning interior design studio creating timeless, luxurious spaces that tell your unique story.",
    image: "/assets/generated/hero-interior.dim_1920x1080.jpg",
  });

  const { data: projects, isLoading } = useGetAllProjects();
  const featuredProjects = projects?.slice(0, 3) ?? [];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay">
        <img
          src="/assets/generated/hero-interior.dim_1920x1080.jpg"
          alt="Maison Elara luxury interior"
          className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
          loading="eager"
        />
        {/* Warm-toned layered gradient — deep brown base for luxury depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1208]/55 via-[#0e0a05]/35 to-[#0e0a05]/80" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0e0a05]/50 via-transparent to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Eyebrow with flanking rules */}
          <div className="flex items-center justify-center gap-4 mb-10 fade-in">
            <span className="block w-12 h-px bg-gold/50" />
            <p className="eyebrow-primary text-gold/90 tracking-[0.45em]">
              Award-Winning Interior Design
            </p>
            <span className="block w-12 h-px bg-gold/50" />
          </div>

          {/* Headline — weight contrast between roman and italic */}
          <h1
            className="display-hero text-[clamp(3.5rem,9vw,7rem)] text-white mb-8 slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Spaces That Tell
            <br />
            <em>Your Story</em>
          </h1>

          <p
            className="font-body text-white/65 text-base md:text-lg max-w-md mx-auto mb-12 leading-relaxed tracking-wide fade-in"
            style={{ animationDelay: "0.45s" }}
          >
            Award-winning interior design for the modern luxury home
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Link
              to="/portfolio"
              data-ocid="hero.portfolio_button"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-gold text-white text-[0.65rem] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-gold-dark transition-all duration-400 hover:shadow-glow hover:-translate-y-1 group"
            >
              View Portfolio
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              data-ocid="hero.contact_button"
              className="inline-flex items-center gap-2 px-9 py-4 border border-white/30 text-white text-[0.65rem] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-white/8 hover:border-white/55 transition-all duration-400 backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Scroll indicator — positioned lower, more refined */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-white/35 text-[9px] tracking-[0.4em] uppercase">
            Scroll
          </span>
          <div className="relative w-px h-14 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-28 lg:py-40 px-6 max-w-7xl mx-auto">
        <AnimatedSection className="mb-16 lg:mb-20">
          {/* Left-aligned — breaks the centered-only monotony */}
          <p className="eyebrow-primary mb-4">Our Work</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="display-section text-5xl md:text-6xl lg:text-7xl text-foreground max-w-xl">
              Featured <em>Projects</em>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A curated selection from our most celebrated residential and
              commercial commissions.
            </p>
          </div>
          <div className="w-24 h-px bg-gold mt-8" />
        </AnimatedSection>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-muted animate-pulse"
              >
                <div className="aspect-[4/3] bg-muted-foreground/10" />
                <div className="p-6 space-y-2">
                  <div className="h-3 bg-muted-foreground/10 w-1/4 rounded" />
                  <div className="h-5 bg-muted-foreground/10 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredProjects.map((project, i) => (
              <AnimatedSection key={String(project.id)} delay={i * 120}>
                <Link
                  to="/portfolio"
                  className="group block rounded-3xl overflow-hidden bg-card border border-border/60 card-resting"
                >
                  {/* Taller image ratio for more drama */}
                  <div className="relative aspect-[2/3] overflow-hidden bg-beige dark:bg-muted/20">
                    <img
                      src={getCategoryImage(project.category, project.images)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    {/* Cinematic bottom vignette — always on, deepens on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-600" />
                    {/* Category — bottom-left, slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                      <span className="eyebrow-secondary text-white/70 group-hover:text-white/90 transition-colors">
                        {categoryLabels[project.category] ?? project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card body — clean, title-led */}
                  <div className="px-6 pt-5 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 font-medium">
                        {String(project.year)}
                      </p>
                      <span className="w-4 h-px bg-gold/40 group-hover:w-8 transition-all duration-500" />
                    </div>
                    <h3 className="font-display text-2xl font-normal text-foreground mb-2.5 title-hover-rule group-hover:text-gold transition-colors duration-300 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection className="text-center mt-16">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2.5 text-gold text-[0.65rem] tracking-[0.2em] uppercase font-semibold group hover:gap-4 transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </AnimatedSection>
      </section>

      {/* Services Teaser — deliberately quieter density as a palate cleanser */}
      <section className="py-20 bg-beige dark:bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14 pb-10 border-b border-border/50">
            <div>
              <p className="eyebrow-secondary text-muted-foreground mb-2">
                What We Do
              </p>
              <h2 className="font-display text-3xl font-light text-foreground">
                Design Services
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-gold text-[0.65rem] tracking-[0.18em] uppercase font-semibold hover:gap-3 transition-all duration-300 group shrink-0"
            >
              Explore All Services
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceHighlights.map((item, i) => (
              <AnimatedSection
                key={item.title}
                delay={i * 100}
                className="group"
              >
                {/* Number + divider — editorial treatment */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-display text-3xl font-light text-gold/30 leading-none">
                    0{i + 1}
                  </span>
                  <span className="flex-1 h-px bg-border" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-4 group-hover:bg-gold/18 transition-colors duration-300">
                  <item.icon className="w-4.5 h-4.5 text-gold" />
                </div>
                <h3 className="font-display text-xl font-normal text-foreground mb-2.5">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser — dominant breathing section */}
      <section className="py-32 lg:py-44">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[560px] shadow-luxury">
                <img
                  src="/assets/generated/founder-portrait.dim_400x500.jpg"
                  alt="Elara Beaumont — Founder"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Decorative gold accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gold/10 border border-gold/20 -z-10" />
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-xl bg-beige dark:bg-muted -z-10" />

              {/* Floating stat card */}
              <div className="absolute bottom-8 left-8 glass-card rounded-2xl px-6 py-4 shadow-luxury">
                <p className="font-display text-3xl font-light text-gold">
                  12+
                </p>
                <p className="text-xs text-muted-foreground tracking-wide uppercase">
                  Years of Excellence
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <p className="eyebrow-primary mb-5">Our Story</p>
              <h2 className="display-section text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-[1.0]">
                Where Luxury Meets
                <br />
                <em>Living Art</em>
              </h2>
              <div className="w-20 h-px bg-gold mb-10" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2012 by Elara Beaumont, Maison Elara has established
                itself as one of Europe's most celebrated interior design
                studios. Our philosophy is simple: every space should be a
                reflection of the soul within it.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                With projects spanning Paris, London, Dubai, and New York, we
                bring a distinctly European sensibility to luxury residential
                and commercial design — creating environments that feel
                timeless, intentional, and deeply personal.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { num: "200+", label: "Projects" },
                  { num: "18", label: "Awards" },
                  { num: "4", label: "Countries" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-3xl font-light text-gold mb-1">
                      {stat.num}
                    </p>
                    <p className="text-xs text-muted-foreground tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-xs tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-foreground/80 transition-all duration-300"
              >
                Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Tagline Banner — maximal display size, asymmetric layout */}
      <section className="py-24 lg:py-32 bg-foreground text-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="lg:max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                <span className="eyebrow-secondary text-background/40 tracking-[0.3em]">
                  The Maison Elara Promise
                </span>
              </div>
              <blockquote className="display-hero text-[clamp(2.2rem,5vw,4.5rem)] text-background leading-[1.0]">
                "We design spaces that{" "}
                <em className="text-gold">transcend trends</em>
                <br className="hidden md:block" /> and endure through time."
              </blockquote>
            </div>
            {/* Decorative vertical rule */}
            <div className="hidden lg:flex flex-col items-center gap-4 shrink-0">
              <span className="w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
              <span className="font-display text-[10px] tracking-[0.3em] uppercase text-background/25 rotate-90 whitespace-nowrap mt-4">
                Est. 2012
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
