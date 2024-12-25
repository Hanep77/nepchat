import getConversations from "@/actions/getConversations";
import ConversationBox from "./ConversationBox";

export default async function Sidebar() {
  const conversations = await getConversations();
  return (
    <div className="hidden py-4 px-4 md:block md:w-96 bg-zinc-900 border-e border-zinc-700">
      <h2 className="text-2xl font-bold italic mb-4">NepChat</h2>
      <div className="border-t border-zinc-700">
        {conversations?.map(conversation => (
          <ConversationBox id={conversation.id} name={conversation.users[0].User.name} />
        ))}
      </div>
    </div>
  )
}
