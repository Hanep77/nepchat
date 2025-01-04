"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function UserBox({ user }: { user: User }) {
  const router = useRouter();
  const firstLetterName = user.name?.[0];

  const handleClick = useCallback(() => {
    axios.post('/api/conversations', {
      userId: user.id
    })
      .then(data => {
        router.push('/chat/' + data.data.id);
      })
  }, [user]);

  return (
    <button onClick={handleClick} className="flex items-center gap-2 bg-zinc-800 rounded py-1 px-2 border border-zinc-700 font-medium text-start">
      <div className="h-10 w-10 bg-zinc-700 rounded-full flex justify-center items-center font-medium text-2xl">
        {firstLetterName}
      </div>
      {user.name}
    </button>
  )
}
