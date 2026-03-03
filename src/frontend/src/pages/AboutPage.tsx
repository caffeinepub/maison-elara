import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Leaf, Star } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { useMetaTags } from "../hooks/useMetaTags";
import { useGetAllTeamMembers } from "../hooks/useQueries";

const teamImages: Record<string, string> = {
  "founder-portrait": "/assets/generated/founder-portrait.dim_400x500.jpg",
  "team-member2": "/assets/generated/team-member2.dim_400x500.jpg",
};

function getTeamImage(image: string, index: number): string {
  for (const [key, val] of Object.entries(teamImages)) {
    if (image.toLowerCase().includes(key)) return val;
  }
  const fallbacks = [
    "/assets/generated/founder-portrait.dim_400x500.jpg",
    "/assets/generated/team-member2.dim_400x500.jpg",
  ];
  return fallbacks[index % fallbacks.length];
}

const values = [
  {
    icon: Star,
    title: "Uncompromising Excellence",
    desc: "We pursue perfection in every detail — from the breadth of our material palette to the precision of a single hem.",
  },
  {
    icon: Heart,
    title: "Human-Centered Design",
    desc: "Every space we create is built around the people who inhabit it. We listen deeply before we design.",
  },
  {
    icon: Leaf,
    title: "Thoughtful Sustainability",
    desc: "We source responsibly, specifying materials and makers that prioritize environmental and social stewardship.",
  },
];

export function AboutPage() {
  useMetaTags({
    title: "About Us",
    description:
      "Learn about Maison Elara — our story, philosophy, and the passionate team behind one of Europe's most celebrated interior design studios.",
    image: "/assets/generated/founder-portrait.dim_400x500.jpg",
  });

  const { data: team, isLoading: teamLoading } = useGetAllTeamMembers();

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative pt-32 pb-24 px-6 overflow-hidden bg-foreground text-background">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-interior.dim_1920x1080.jpg')",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">
              Our Story
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6">
              MAISON ELARA
            </h1>
            <div className="w-16 h-px bg-gold mx-auto mb-6" />
            <p className="text-background/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light">
              Designing spaces where luxury and life converge since 2012.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Brand Story */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">
                Mission & Philosophy
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
                Beauty Lives in
                <br />
                <em>Every Detail</em>
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                <p>
                  Maison Elara was founded in Paris in 2012 by Elara Beaumont, a
                  graduate of the École Nationale Supérieure des Arts
                  Décoratifs. What began as a small atelier specializing in
                  Haussmann apartment renovations has grown into an
                  internationally recognized studio with projects across Europe,
                  the Middle East, and the Americas.
                </p>
                <p>
                  Our philosophy is rooted in a conviction that a home is not
                  merely a physical space — it is a living reflection of its
                  inhabitants, their memories, aspirations, and values. We
                  approach every commission with curiosity and deep listening,
                  taking the time to truly understand the people behind the
                  brief before a single sketch is drawn.
                </p>
                <p>
                  This process-first ethos distinguishes us from studios that
                  apply a signature aesthetic uniformly. At Maison Elara, no two
                  projects look the same — because no two clients are the same.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150} className="space-y-6">
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">
                Design Approach
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
                Process &
                <br />
                <em>Craft</em>
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                <p>
                  Our design process begins with deep research and listening
                  sessions with each client. We explore their daily rhythms,
                  aesthetic inclinations, favorite materials, and how they
                  envision their life unfolding in the new space.
                </p>
                <p>
                  From concept to execution, we work with master artisans,
                  custom furniture makers, and specialist material suppliers to
                  bring every vision to life. Our project management team
                  coordinates all tradespeople with military precision, ensuring
                  timelines and quality benchmarks are consistently met.
                </p>
                <p>
                  The result: spaces that exceed expectations not just visually,
                  but experientially — environments that feel effortless,
                  personal, and utterly irreplaceable.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { num: "200+", label: "Projects Completed" },
                  { num: "18", label: "Industry Awards" },
                  { num: "4", label: "Countries" },
                  { num: "12+", label: "Years of Excellence" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-beige dark:bg-muted/30 p-5 border border-border"
                  >
                    <p className="font-display text-2xl font-light text-gold mb-1">
                      {stat.num}
                    </p>
                    <p className="text-xs text-muted-foreground tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-beige dark:bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
              The People
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
              Meet Our Team
            </h2>
            <div className="w-16 h-px bg-gold mx-auto" />
          </AnimatedSection>

          {teamLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-4">
                  <Skeleton className="w-48 h-48 rounded-full mx-auto" />
                  <Skeleton className="h-5 w-1/2 mx-auto" />
                  <Skeleton className="h-4 w-1/3 mx-auto" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(team ?? []).map((member, i) => (
                <AnimatedSection
                  key={String(member.id)}
                  delay={i * 100}
                  className="text-center group"
                >
                  <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden border-4 border-gold/20 group-hover:border-gold/50 transition-all duration-300 shadow-soft">
                    <img
                      src={getTeamImage(member.image, i)}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-xl font-medium text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gold text-xs tracking-[0.15em] uppercase font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                    {member.bio}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
              What Guides Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
              Our Values
            </h2>
            <div className="w-16 h-px bg-gold mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <AnimatedSection
                key={value.title}
                delay={i * 100}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display text-xl font-medium text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.desc}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
