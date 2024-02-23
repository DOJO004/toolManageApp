import DashboardCard from "./card";

export default function DashboardIndex() {
  return (
    <div className="w-full lg:grid-cols-2 lg:grid lg:gap-1 xl:grid-cols-3">
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
    </div>
  );
}
