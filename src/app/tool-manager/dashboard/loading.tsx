import { DashboardCardSkeleton } from "@/app/components/skeletons";

export default function Loading() {
  return (
    <div className="mx-auto">
      <div className="w-full max-w-7xl lg:grid-cols-2 lg:grid lg:gap-2 xl:grid-cols-3">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
    </div>
  );
}
