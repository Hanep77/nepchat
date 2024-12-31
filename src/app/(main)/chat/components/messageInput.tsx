"use client"

import axios from "axios";
import { BiSend } from "react-icons/bi";

export default function MessageInput({ conversationId }: { conversationId: string }) {
  const handleSendMessage = (formData: FormData) => {
    const message = formData.get("message")
    const data = {
      message: message,
    }
    axios.post("/api/messages/create/" + conversationId, data, { headers: { Accept: "application/json" } })
  }

  return (
    <form className="h-10 w-full flex justify-center gap-1" action={handleSendMessage}>
      <input type="text"
        name="message"
        placeholder="type your message here..."
        className="h-full rounded flex-grow px-4 bg-zinc-800 border border-zinc-700 outline-none focus:ring-1 ring-zinc-300"
        autoComplete="off"
      />
      <button type="submit" className="bg-zinc-800 border border-zinc-700 px-4 rounded hover:bg-zinc-700"><BiSend /></button>
    </form>
  )
}
