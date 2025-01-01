import getConversations from "@/actions/getConversations";
import ConversationBox from "./ConversationBox";
import { cookies } from "next/headers";
import SearchForm from "./searchForm";

export default async function Sidebar() {
  const cookieStore = await cookies();
  const search = cookieStore.get("search");
  const conversations = await getConversations(search?.value);
  return (
    <div className="hidden py-4 md:block md:w-96 bg-zinc-900 border-e border-zinc-700">
      <h2 className="text-2xl font-bold italic mb-4 px-3">NepChat</h2>
      <SearchForm search={search?.value} />
      <div>
        {conversations?.map((conversation, index) => (
          <ConversationBox key={index} id={conversation.id} name={conversation.users[0].User.name} lastMessage={conversation.messages[0]} />
        ))}
      </div>
    </div>
  )
}
