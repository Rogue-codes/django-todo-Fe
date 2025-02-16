import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import AuthGuard from "./Guard/AuthGuard";

const AppOutlet = () => {
  return (
    <AuthGuard>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AuthGuard>
  );
};

export default AppOutlet;