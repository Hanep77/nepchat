import { getServerSession } from "next-auth"
import prisma from "@/libs/prismadb";

const getUsers = async (name?: string) => {
  const session = await getServerSession();

  if (!session?.user) {
    return [];
  }

  try {
    const users = prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        NOT: {
          email: session.user.email
        },
        name: {
          contains: name,
          mode: "insensitive"
        }
      }
    })

    return users;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export default getUsers;
