import DashboardCard from "./card";

export default function DashboardIndex() {
  return (
    <div className="md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3">
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
