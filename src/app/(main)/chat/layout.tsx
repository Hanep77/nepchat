import { ReactNode } from "react";
import Sidebar from "./components/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-grow flex">
      <Sidebar />
      {children}
    </div>
  )
}
