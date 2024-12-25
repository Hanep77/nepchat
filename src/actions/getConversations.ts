import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";

const getConversations = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const conversations = prisma.conversation.findMany({
      where: {
        users: { some: { userId: currentUser.id } }
      },
      include: {
        users: {
          where: {
            NOT: {
              userId: currentUser.id
            }
          },
          select: {
            userId: true,
            User: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        lastMessageAt: "desc"
      }
    });

    return conversations;
  } catch (err: any) {
    return null;
  }
}

export default getConversations;
