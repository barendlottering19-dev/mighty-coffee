export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-espresso-light rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="h-8 w-48 skeleton rounded" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 skeleton rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 skeleton rounded" />
              <div className="h-3 w-1/2 skeleton rounded" />
            </div>
            <div className="h-8 w-20 skeleton rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
