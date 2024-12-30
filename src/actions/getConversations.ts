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
        users: { some: { userId: currentUser.id } },
        messages: { some: {} }
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
        },
        messages: {
          orderBy: {
            createdAt: "desc"
          },
          take: 1
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
