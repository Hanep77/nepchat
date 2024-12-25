"use client"

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ConversationBox({ name, id }: { name: string | null, id: string }) {
  const param = useParams();
  const firstLetterName = name?.[0].toUpperCase();

  return (
    <Link href={"/chat/" + id}
      className={`block ${param.conversationId == id && "bg-zinc-800"} py-2 border-b border-zinc-700 font-medium text-start text-lg flex gap-2`}>
      <div className="h-9 w-9 bg-zinc-700 rounded-full flex justify-center items-center font-medium">
        {firstLetterName}
      </div>
      <div className="flex-grow flex items-center">
        {name}
      </div>
    </Link>
  )
}
