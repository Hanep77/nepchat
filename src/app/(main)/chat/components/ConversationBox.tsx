"use client"

import { pusherClient } from "@/libs/pusher";
import formatDate from "@/utils/formatDate";
import { Message } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConversationBox({ name, id, lastMessage }: { name: string | null, id: string, lastMessage: Message }) {
  const [lastMessageState, setLastMessageState] = useState<Message>(lastMessage)
  const param = useParams();
  const firstLetterName = name?.[0];

  useEffect(() => {
    const channel = pusherClient.subscribe("chat-channel");

    const handleNewMessage = (data: { createChat: Message }) => {
      if (data.createChat.conversationId == id) {
        setLastMessageState(data.createChat);
      }
    }

    channel.bind('new-message', handleNewMessage);

    return () => {
      channel.unbind('new-message', handleNewMessage);
      pusherClient.unsubscribe("chat-channel");
    }
  }, [lastMessageState]);

  return (
    <Link href={"/chat/" + id}
      className={`block ${param.conversationId == id && "bg-zinc-800"} py-2 px-3 border-b border-zinc-700 font-medium text-start flex items-center gap-2`}>
      <div className="h-12 w-12 bg-zinc-700 rounded-full flex justify-center items-center font-medium text-2xl">
        {firstLetterName}
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <h3 className="text-lg ">
            {name}
          </h3>
          <p className="text-sm text-zinc-400 font-normal">{formatDate(lastMessageState.createdAt)}</p>
        </div>
        <p className="text-zinc-400 font-normal">{lastMessageState.body}</p>
      </div>
    </Link>
  )
}
