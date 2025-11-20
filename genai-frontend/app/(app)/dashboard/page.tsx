import DashboardComponent from "@/components/dashboard/DashboardComponent";
import ExperimentMode from "@/components/dashboard/ExperimentMode";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <div className="h-full w-full">
      <DashboardComponent />
    </div>
  );
}
