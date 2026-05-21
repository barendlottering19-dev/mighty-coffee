export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-espresso-light rounded-xl overflow-hidden ${className}`}>
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 skeleton" />
        <div className="h-4 w-full skeleton" />
        <div className="h-4 w-1/2 skeleton" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 w-16 skeleton" />
          <div className="h-8 w-8 skeleton rounded-full" />
        </div>
      </div>
    </div>
  );
}
