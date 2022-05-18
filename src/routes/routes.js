import Dashboard from "../pages/Dashboard";

export const routes = [
  {
    sidebar: true,
    path: "/info",
    component: "Info",
  },
  {
    sidebar: false,
    path: "/dashboard",
    component: Dashboard,
  },
];
