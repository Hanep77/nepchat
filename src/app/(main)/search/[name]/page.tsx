import getUsers from "@/actions/getUsers";
import UserBox from "../components/userBox";

export default async function Search({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const users = await getUsers(name);
  return (
    <div className="w-full text-lg flex flex-col gap-2">
      {users.map((user, i) => (
        <UserBox key={i} user={user} />
      ))}
    </div>
  )
}

