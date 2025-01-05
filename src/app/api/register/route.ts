import bcrypt from "bcrypt"
import prisma from "@/libs/prismadb";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();
    const {
      email, name, password
    } = body;

    if (!email || !name || !password) {
      return new Response("Missing info", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email, name, hashedPassword
      }
    });

    return Response.json(user);
  } catch (error: unknown) {
    console.log(error, 'registration error');
    return new Response('Internal Error', { status: 500 });
  }
}
