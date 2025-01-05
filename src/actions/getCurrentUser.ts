import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";

export type CurrentUserType = {
  name: string
}

const getCurrentUser = async () => {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

export default getCurrentUser;
