export function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-espresso-light rounded-xl overflow-hidden">
          <div className="aspect-[4/3] skeleton" />
          <div className="p-4 space-y-3">
            <div className="h-5 w-3/4 skeleton rounded" />
            <div className="h-4 w-full skeleton rounded" />
            <div className="h-4 w-1/2 skeleton rounded" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 w-16 skeleton rounded" />
              <div className="h-8 w-20 skeleton rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
