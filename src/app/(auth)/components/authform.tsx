"use client";

import Input from "@/app/components/input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER";

type AuthType = {
  name?: string,
  email: string,
  password: string
}

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const toggleVariant = useCallback(() => {
    if (variant == "LOGIN") {
      setVariant("REGISTER")
    }
    else {
      setVariant("LOGIN");
    }
  }, [variant]);

  useEffect(() => {
    if (session?.status == 'authenticated') {
      router.push('/chat');
    }
  }, [session]);

  const authRequest = (formData: FormData) => {
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    } as AuthType;

    if (variant == "REGISTER") {
      axios.post('/api/register', user)
        .then(() => signIn('credentials', user));
    }

    if (variant == "LOGIN") {
      signIn('credentials', {
        ...user,
        redirect: false
      })
        .then((callback) => {
          if (callback?.error) {
            alert('Invalid Credentials');
          }

          if (callback?.ok) {
            router.push('/chat');
          }
        })
    }
  }

  const socialAuth = (action: string) => {
    signIn(action, { redirect: false })
      .then(callback => {
        if (callback?.error) {
          alert('Invalid Credentials');
        }

        if (callback?.ok) {
          router.push('/users');
        }
      })
  }

  return (
    <div className="p-5 shadow bg-white rounded w-80">
      <div className="grid grid-cols-2 gap-1 text-center mb-5 rounded">
        <button onClick={() => variant == "REGISTER" && toggleVariant()}
          className={`${variant == "LOGIN" ? "bg-blue-500 text-white" : "border-2 border-blue-500 hover:bg-blue-500 hover:text-white"} h-8 rounded`}>
          Sign in
        </button>
        <button onClick={() => variant == "LOGIN" && toggleVariant()}
          className={`${variant == "REGISTER" ? "bg-blue-500 text-white" : "border-2 border-blue-500 hover:bg-blue-500 hover:text-white"} h-8 rounded`}>
          Register
        </button>
      </div>
      <form action={authRequest} className="flex flex-col gap-2">
        {variant == "REGISTER" && <Input type="text" name="name" label="Name" required={true} />}
        <Input type="email" name="email" label="Email" required={true} />
        <Input type="password" name="password" label="Password" required={true} />
        <button type="submit" className="h-8 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded">
          {variant == "LOGIN" ? "Sign in" : "Register"}
        </button>
        <div className="relative my-2 flex justify-evenly items-center gap-2">
          <div className="border-t border-zinc-300 flex-grow" />
          <span className="text-sm text-zinc-600">Or sign in with</span>
          <div className="border-t border-zinc-300 flex-grow" />
        </div>
        <div className="grid grid-cols-2 gap-1">
          <button type="button" onClick={() => socialAuth('github')}
            className="border border-zinc-600 flex items-center justify-center gap-1 py-1 rounded hover:bg-zinc-600 text-zinc-600 hover:text-white">
            <BsGithub /> Github
          </button>
          <button type="button" onClick={() => socialAuth('google')}
            className="border border-red-600 flex items-center justify-center gap-1 py-1 rounded hover:bg-red-600 text-red-600 hover:text-white">
            <BsGoogle /> Goggle
          </button>
        </div>
      </form>
    </div>
  )
}
