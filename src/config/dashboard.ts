import { DashboardConfig } from "@/../types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
      disabled: true,
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "Home",
    },
    {
      title: "Transactions",
      href: "/dashboard/transactions",
      icon: "CreditCard",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
    {
      title: "Send",
      href: "/dashboard/send",
      icon: "Send",
    },
  ],
};
