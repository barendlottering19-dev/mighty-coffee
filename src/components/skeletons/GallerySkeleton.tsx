export function GallerySkeleton() {
  const heights = ["h-64", "h-80", "h-56", "h-72", "h-96", "h-64", "h-48", "h-72"];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {heights.map((h, i) => (
        <div key={i} className={`relative ${h} skeleton rounded-xl`} />
      ))}
    </div>
  );
}
