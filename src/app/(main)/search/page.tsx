import getUsers from "@/actions/getUsers";
import UserBox from "./components/userBox";

export default async function Search() {
  const users = await getUsers();
  return (
    <div className="w-full text-lg flex flex-col gap-2">
      {users.map((user, i) => (
        <UserBox key={i} user={user} />
      ))}
    </div>
  )
}
