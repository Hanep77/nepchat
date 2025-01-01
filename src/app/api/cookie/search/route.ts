import { cookies } from "next/headers";

export async function POST(request: Request) {
  const data = await request.json();
  const storeCookie = await cookies();
  storeCookie.set("search", data.search);
  return Response.json(data);
}
