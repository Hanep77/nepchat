import getConversationById from "@/actions/getConversationByid";
import MessageInput from "../components/messageInput";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import formatDate from "@/utils/formatDate";

export interface IParams {
  conversationId: string
}

export default async function Chat({ params }: { params: Promise<IParams> }) {
  const { conversationId } = await params;
  const conversation = await getConversationById(conversationId);
  const currentUser = await getCurrentUser();
  const otherUser = conversation?.users[0].User;
  // redirect when conversation is null
  conversation ?? redirect('/chat');

  return (
    <div className="flex flex-col flex-grow h-screen relative">
      <div className="sticky w-full">
        <div className="h-16 border-b border-zinc-700 flex items-center px-4 gap-4">
          <div className="w-10">
            <div className="w-12 h-12 rounded-full bg-zinc-700 flex justify-center items-center text-2xl font-semibold">
              {(otherUser?.name as string)[0]}
            </div>
          </div>
          <h2 className="text-lg font-medium text-zinc-200">{otherUser?.name}</h2>
        </div>
      </div>

      <div className="px-4 pt-4 pb-16 w-full overflow-y-auto">
        {conversation?.messages.map((message, index) => (
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
      </div>

      <div className="absolute w-full bottom-0 py-2 flex items-center justify-center px-4 bg-zinc-900 gap-4">
        <MessageInput conversationId={conversationId} />
      </div>
    </div >
  )
}
