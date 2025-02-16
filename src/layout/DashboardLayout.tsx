import { ReactNode } from "react";
import Nav from "../component/nav/Nav";

interface IDashboardLayout {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IDashboardLayout) {
  return (
    <div>
      <Nav
      />
      <div className="mt-40 px-12">
        {children}
      </div>
    </div>
  );
}