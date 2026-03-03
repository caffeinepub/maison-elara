import { useState } from "react";
import type { ProductCategory } from "../backend.d.ts";
import { AnimatedSection } from "../components/AnimatedSection";
import { SkeletonGrid } from "../components/SkeletonCard";
import { useMetaTags } from "../hooks/useMetaTags";
import { useGetAllProducts } from "../hooks/useQueries";

const categoryLabels: Record<string, string> = {
  all: "All",
  furniture: "Furniture",
  lighting: "Lighting",
  decor: "Décor",
  textiles: "Textiles",
};

const productCategories = ["all", "furniture", "lighting", "decor", "textiles"];

const productImages: Record<string, string> = {
  furniture: "/assets/generated/product-chair.dim_600x600.jpg",
  lighting: "/assets/generated/product-lamp.dim_600x600.jpg",
  decor: "/assets/generated/product-vase.dim_600x600.jpg",
  textiles: "/assets/generated/product-table.dim_600x600.jpg",
};

const allProductImages = [
  "/assets/generated/product-chair.dim_600x600.jpg",
  "/assets/generated/product-lamp.dim_600x600.jpg",
  "/assets/generated/product-vase.dim_600x600.jpg",
  "/assets/generated/product-table.dim_600x600.jpg",
];

function getProductImage(category: ProductCategory, index: number): string {
  return (
    productImages[category] ?? allProductImages[index % allProductImages.length]
  );
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductsPage() {
  useMetaTags({
    title: "Products",
    description:
      "Shop Maison Elara's curated collection of luxury furniture, lighting, décor, and textiles for the modern home.",
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const { data: products, isLoading } = useGetAllProducts();

  const filtered =
    activeCategory === "all"
      ? (products ?? [])
      : (products ?? []).filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <div className="pt-32 pb-16 px-6 text-center bg-beige dark:bg-muted/20">
        <AnimatedSection>
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Curated Collection
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-foreground mb-4">
            Products
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mt-2 mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Each piece in our collection is carefully sourced and curated to
            meet the highest standards of craftsmanship, beauty, and longevity.
          </p>
        </AnimatedSection>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-8 border-b border-border bg-background sticky top-[4.5rem] z-30 shadow-soft">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {productCategories.map((cat, i) => (
            <button
              key={cat}
              type="button"
              data-ocid={`products.filter.tab.${i + 1}`}
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

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkeletonGrid count={8} aspect="square" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24" data-ocid="products.empty_state">
            <p className="font-display text-2xl text-muted-foreground mb-2">
              No products found
            </p>
            <p className="text-sm text-muted-foreground">
              Try selecting a different category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <AnimatedSection key={String(product.id)} delay={i * 60}>
                <div
                  data-ocid={`products.item.${i + 1}`}
                  className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover-lift cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden bg-beige dark:bg-muted/30">
                    <img
                      src={getProductImage(product.category, i)}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-background/80 backdrop-blur-sm text-foreground text-[9px] tracking-[0.15em] uppercase font-semibold rounded-full">
                      {categoryLabels[product.category]}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-medium text-foreground mb-1 group-hover:text-gold transition-colors duration-300 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="font-display text-lg font-medium text-gold">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
