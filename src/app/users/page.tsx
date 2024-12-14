"use client"

import { signOut } from "next-auth/react";

export default function Users() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <button type="button" onClick={() => signOut()}
        className="bg-red-600 hover:bg-red-500 px-2 py-1 rounded text-white">
        Logout
      </button>
    </div>
  )
}
