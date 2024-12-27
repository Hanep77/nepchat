import getConversationById from "@/actions/getConversationByid";
import MessageInput from "../components/messageInput";

export interface IParams {
  conversationId: string
}

const data = {
  name: "Rusdi",
  messages: [
    {
      id: 1,
      sender: "me",
      text: "p"
    },
    {
      id: 2,
      sender: "notme",
      text: "euy"
    },
    {
      id: 3,
      sender: "me",
      text: "lorem ipsum dolor sit amet euy"
    },
    {
      id: 1,
      sender: "me",
      text: "p"
    },
    {
      id: 2,
      sender: "notme",
      text: "euy"
    },
    {
      id: 3,
      sender: "me",
      text: "lorem ipsum dolor sit amet euy"
    },
    {
      id: 1,
      sender: "me",
      text: "p"
    },
    {
      id: 2,
      sender: "notme",
      text: "euy"
    },
    {
      id: 3,
      sender: "me",
      text: "lorem ipsum dolor sit amet euy"
    },
    {
      id: 1,
      sender: "me",
      text: "p"
    },
    {
      id: 2,
      sender: "notme",
      text: "euy"
    },
    {
      id: 3,
      sender: "me",
      text: "lorem ipsum dolor sit amet euy"
    },
    {
      id: 4,
      sender: "me",
      text: "lorem ipsum dolor sit amet euy lorem ipsum dolor sit amet euy"
    }
  ]
}

export default async function Chat({ params }: { params: Promise<IParams> }) {
  const { conversationId } = await params;
  const conversation = await getConversationById(conversationId);
  console.log(conversation);

  return (
    <div className="flex flex-col flex-grow h-screen relative">
      <div className="sticky w-full ">
        <div className="h-16 border-b border-zinc-700 flex items-center px-4 gap-4">
          <div className="w-10">
            <div className="w-12 h-12 rounded-full bg-zinc-700 flex justify-center items-center text-2xl font-semibold">
              {data.name[0]}
            </div>
          </div>
          <h2 className="text-lg font-medium text-zinc-200">{data.name}</h2>
        </div>
      </div>

      <div className="px-4 py-4 w-full overflow-y-auto">
        {data.messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender == "me" && "justify-end"} mb-1`}>
            <div className={`bg-zinc-800 py-2 px-4 ${message.sender == "me" ? "rounded-l-3xl rounded-tr-3xl" : "rounded-r-3xl rounded-tl-3xl"} max-w-96 text-wrap`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 py-2 flex items-center justify-center px-4 gap-4">
        <MessageInput conversationId={conversationId} />
      </div>
    </div>
  )
}
