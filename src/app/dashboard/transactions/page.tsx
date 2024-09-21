import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

import UserTransactionsTable from "@/components/transactions/user-transaction-table";

export const metadata = {
  title: "Transactions",
  description: "View your transaction history.",
};

export default async function TransactionsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Transactions"
        text="View your transaction history."
      />
      <div className="grid gap-10">
        <UserTransactionsTable />
      </div>
    </DashboardShell>
  );
}
