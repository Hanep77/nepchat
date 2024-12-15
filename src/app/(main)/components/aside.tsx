"use client"

import useRoutes from "@/hooks/useRoutes";
import { User } from "@prisma/client";
import Link from "next/link";

export default function Aside({ currentUser }: { currentUser: User | null }) {
  const routes = useRoutes();
  const firstLetterName = currentUser?.name ? currentUser.name[0].toUpperCase() : ':';

  return (
    <aside className="min-h-screen p-3 bg-zinc-800 border-e border-zinc-700 text-white flex flex-col justify-between">
      <ul className="text-2xl">
        {routes.map((route, i) => (
          <li key={i}><Link onClick={route.onClick} href={route.href} className={`${route.active && "bg-zinc-700"} inline-block hover:bg-zinc-700 p-2 rounded`}>{<route.icon />}</Link></li>
        ))}
      </ul>
      <div className="p-2 bg-zinc-700 rounded-full flex justify-center items-center font-medium">{firstLetterName}</div>
    </aside>
  )
}
