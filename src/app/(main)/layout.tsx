import getCurrentUser from "@/actions/getCurrentUser";
import { ReactNode } from "react";
import Aside from "./components/aside";

export default async function Layout({ children }: { children: ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="min-h-screen flex bg-zinc-900 text-zinc-100">
      <Aside currentUser={currentUser} />
      {children}
    </div>
  )
}
