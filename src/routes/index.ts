import { lazy } from "react";
import { paths } from "./paths";

const routes = [
  {
    path: paths.DASHBOARD,
    exact: true,
    component: lazy(() => import("../views/dashboard/Dashboard")),
  }
];

export default routes;