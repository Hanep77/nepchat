"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function UserBox({ user }: { user: User }) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    axios.post('/api/conversations', {
      userId: user.id
    })
      .then(data => {
        console.log(data)
        // router.push('/chat/' + data.data.id);
      })
  }, [user]);

  return (
    <button onClick={handleClick} className="bg-zinc-800 rounded py-1 px-2 font-medium text-start">
      {user.name}
    </button>
  )
}
