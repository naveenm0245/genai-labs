import DashboardComponent from "@/components/dashboard/DashboardComponent";
import ExperimentMode from "@/components/dashboard/ExperimentMode";

export default async function Home() {
  return (
    <div className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full">
      <DashboardComponent />
    </div>
  );
}
