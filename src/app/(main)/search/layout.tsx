import { ReactNode } from "react";
import { LiaSearchSolid } from "react-icons/lia";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-grow">
      <div className="p-4 w-96">
        <h3 className="font-semibold text-2xl mb-4">Search users</h3>
        <form className="flex text-lg w-full mb-4">
          <input type="text" name="search" className="w-full bg-transparent border border-zinc-700 outline-none py-1 px-2 rounded-s" />
          <button type="submit" className="bg-zinc-700 px-4 rounded-e"><LiaSearchSolid /></button>
        </form>
        {children}
      </div>
    </div>
  )
}
