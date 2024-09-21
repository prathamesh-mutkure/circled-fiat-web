import { redirect } from "next/navigation";

// import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DashboardBarChart } from "@/components/dashboard/bar-chart";
import { DashboardLineChart } from "@/components/dashboard/line-chart";
// import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "Dashboard",
  description: "View data and statistics about your account.",
};

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Data and statistics about your account."
      />
      <div className="grid gap-4">
        <DashboardBarChart />
        <DashboardLineChart />
      </div>
    </DashboardShell>
  );
}
