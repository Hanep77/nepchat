"use client"

import { Conversation, Message, User } from "@prisma/client";
import formatDate from "@/utils/formatDate";
import { useEffect, useRef, useState } from "react";
import MessageInput from "./messageInput";
import { pusherClient } from "@/libs/pusher";

interface ChatProps {
  currentUser: User,
  conversation: Conversation & { messages: Message[] }
}

export default function Messages({ currentUser, conversation }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const channel = pusherClient.subscribe("chat-channel");

    channel.bind('new-message', (data: { createChat: Message }) => {
      setMessages((prev) => [...prev, data.createChat]);
    });
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="px-4 pt-4 w-full overflow-y-auto">
        {messages.map((message: Message, index: number) => (
          <div key={index}
            className={`flex ${message.senderId == currentUser?.id && "justify-end"} ${conversation?.messages[index - 1]?.senderId == message.senderId ? "mt-1" : "mt-2"}`}>
            <div className={`py-2 px-4 ${message.senderId == currentUser?.id ? "rounded-l-3xl rounded-tr-3xl bg-zinc-700" : "rounded-r-3xl rounded-tl-3xl bg-zinc-800 "} max-w-96 text-wrap`}>
              <p>
                {message.body}
              </p>
              <p className="text-xs text-zinc-400 text-end">{formatDate(message.createdAt, true)}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="absolute w-full bottom-0 py-2 flex items-center justify-center px-4 bg-zinc-900 gap-4">
        <MessageInput conversationId={conversation.id} />
      </div>
    </>
  )
}
