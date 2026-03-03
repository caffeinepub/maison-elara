import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard({
  aspect = "landscape",
}: { aspect?: "landscape" | "portrait" | "square" }) {
  const aspectClass =
    aspect === "portrait"
      ? "aspect-[3/4]"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-[4/3]";

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card">
      <Skeleton className={`w-full ${aspectClass}`} />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export function SkeletonGrid({
  count = 6,
  aspect = "landscape",
}: {
  count?: number;
  aspect?: "landscape" | "portrait" | "square";
}) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const key = `skeleton-card-${aspect}-${index}`;
        return <SkeletonCard key={key} aspect={aspect} />;
      })}
    </>
  );
}
