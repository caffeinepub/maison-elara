import { Skeleton } from "@/components/ui/skeleton";
import {
  Check,
  Home,
  LayoutGrid,
  Lightbulb,
  Palette,
  Truck,
  Wrench,
} from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { SkeletonGrid } from "../components/SkeletonCard";
import { useMetaTags } from "../hooks/useMetaTags";
import { useGetAllServices } from "../hooks/useQueries";

const serviceIcons = [Home, Palette, Wrench, LayoutGrid, Lightbulb, Truck];

export function ServicesPage() {
  useMetaTags({
    title: "Services",
    description:
      "Explore Maison Elara's comprehensive interior design services — from residential design to project management and bespoke furniture.",
  });

  const { data: services, isLoading } = useGetAllServices();

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <div className="pt-32 pb-16 px-6 text-center bg-beige dark:bg-muted/20">
        <AnimatedSection>
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
            What We Offer
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-foreground mb-4">
            Our Services
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mt-2 mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            From initial concept to final reveal, we handle every detail of your
            interior transformation with care, precision, and uncompromising
            artistry.
          </p>
        </AnimatedSection>
      </div>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-border p-8 space-y-4"
              >
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="space-y-2 pt-2">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-3 w-3/4" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(services ?? []).map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <AnimatedSection key={String(service.id)} delay={i * 100}>
                  <div className="group h-full glass-card rounded-3xl p-8 hover-lift border border-border/60 hover:border-gold/30 transition-all duration-300">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h2 className="font-display text-2xl font-medium text-foreground group-hover:text-gold transition-colors duration-300">
                        {service.title}
                      </h2>
                      {service.priceRange && (
                        <span className="shrink-0 px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] tracking-[0.1em] uppercase font-semibold rounded-full whitespace-nowrap">
                          {service.priceRange}
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    {service.features.length > 0 && (
                      <div className="space-y-2.5">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 font-semibold mb-3">
                          Included
                        </p>
                        {service.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-2.5"
                          >
                            <div className="w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 text-gold" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="bg-foreground text-background py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">
              Ready to Begin?
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Let's Design Your Dream Space
            </h2>
            <p className="text-background/60 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              Schedule a complimentary consultation and discover how Maison
              Elara can transform your vision into reality.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-gold-dark transition-all duration-300 hover:shadow-glow"
            >
              Book a Consultation
            </a>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
