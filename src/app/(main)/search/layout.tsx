import { ReactNode } from "react";
import SearchUserForm from "./components/searchForm";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-grow">
      <div className="p-4 w-96">
        <h3 className="font-semibold text-2xl mb-4">Search users</h3>
        <SearchUserForm />
        {children}
      </div>
    </div>
  )
}
