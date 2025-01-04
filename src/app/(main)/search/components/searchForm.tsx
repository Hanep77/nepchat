"use client"

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { LiaSearchSolid } from "react-icons/lia";

export default function SearchUserForm() {
  const router = useRouter();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    console.log((event.target as HTMLFormElement).search.value);
    router.push("/search/" + (event.target as HTMLFormElement).search.value);
  }

  return (
    <form onSubmit={handleSearch} className="flex text-lg w-full mb-4">
      <input type="text" name="search" className="w-full bg-transparent border border-zinc-700 outline-none py-1 px-2 rounded-s" placeholder="search" autoComplete="off" />
      <button type="submit" className="bg-zinc-700 px-4 rounded-e"><LiaSearchSolid /></button>
    </form>
  )
}
