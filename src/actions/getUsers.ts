import { getServerSession } from "next-auth"
import prisma from "@/libs/prismadb";

const getUsers = async () => {
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
        }
      }
    })

    return users;
  } catch (error: any) {
    return [];
  }
}

export default getUsers;
