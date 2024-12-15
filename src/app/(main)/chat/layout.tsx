import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-grow flex">
      <div className="hidden md:block md:w-96 bg-zinc-900 border-e border-zinc-700">
      </div>
      {children}
    </div>
  )
}
