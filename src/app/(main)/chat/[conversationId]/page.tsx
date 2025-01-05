import getConversationById from "@/actions/getConversationByid";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import Messages from "../components/messages";

export interface IParams {
  conversationId: string
}

export default async function Chat({ params }: { params: Promise<IParams> }) {
  const { conversationId } = await params;
  const conversation = await getConversationById(conversationId);
  const currentUser = await getCurrentUser();
  const otherUser = conversation?.users[0].User;
  // redirect when conversation is null
  if (conversation) redirect('/chat');

  return (
    <div className="flex flex-col flex-grow h-screen relative pb-16">
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

      <Messages currentUser={currentUser!} conversation={conversation!} />
    </div >
  )
}
