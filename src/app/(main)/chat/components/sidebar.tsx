import getConversations from "@/actions/getConversations";
import ConversationBox from "./ConversationBox";
import { LiaSearchSolid } from "react-icons/lia";

export default async function Sidebar() {
  const conversations = await getConversations();
  return (
    <div className="hidden py-4 md:block md:w-96 bg-zinc-900 border-e border-zinc-700">
      <h2 className="text-2xl font-bold italic mb-4 px-3">NepChat</h2>
      <form className="flex text-lg w-full mb-4 px-3">
        <input type="text" name="search" placeholder="search" className="w-full bg-transparent border border-zinc-700 outline-none py-1 px-2 rounded-s" />
        <button type="submit" className="bg-zinc-700 px-4 rounded-e"><LiaSearchSolid /></button>
      </form>
      <div>
        {conversations?.map((conversation, index) => (
          <ConversationBox key={index} id={conversation.id} name={conversation.users[0].User.name} lastMessage={conversation.messages[0]} />
        ))}
      </div>
    </div>
  )
}
