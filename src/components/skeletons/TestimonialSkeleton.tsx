export function TestimonialSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-espresso-light rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 skeleton rounded-full" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-32 skeleton rounded" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="w-4 h-4 skeleton rounded" />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full skeleton rounded" />
            <div className="h-4 w-5/6 skeleton rounded" />
            <div className="h-4 w-2/3 skeleton rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
