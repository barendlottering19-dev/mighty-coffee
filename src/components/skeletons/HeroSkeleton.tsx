export function HeroSkeleton() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 skeleton" />
      <div className="relative z-10 text-center space-y-6 px-4">
        <div className="h-16 w-64 skeleton mx-auto" />
        <div className="h-6 w-96 skeleton mx-auto max-w-full" />
        <div className="flex gap-4 justify-center">
          <div className="h-12 w-36 skeleton rounded-full" />
          <div className="h-12 w-36 skeleton rounded-full" />
        </div>
      </div>
    </section>
  );
}
