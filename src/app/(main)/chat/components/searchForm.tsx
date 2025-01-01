"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { LiaSearchSolid } from "react-icons/lia";

export default function SearchForm({ search }: { search?: string }) {
  const router = useRouter();
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const search = (e.target as HTMLFormElement).search.value;
    const data = {
      search: search
    }

    axios.post("/api/cookie/search", data).then(() => {
      router.refresh();
    })
  }
  return (
    <form onSubmit={handleSearch} className="flex text-lg w-full mb-4 px-3">
      <input type="text" name="search" placeholder="search" defaultValue={search} className="w-full bg-transparent border border-zinc-700 outline-none py-1 px-2 rounded-s" />
      <button type="submit" className="bg-zinc-700 px-4 rounded-e"><LiaSearchSolid /></button>
    </form>
  )
}
