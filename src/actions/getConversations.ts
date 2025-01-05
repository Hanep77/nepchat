import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";

const getConversations = async (name?: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const conversations = prisma.conversation.findMany({
      where: {
        AND: [
          {
            users: {
              some: {
                userId: currentUser.id,
              }
            },
          },
          {
            users: {
              some: {
                User: { name: { contains: name, mode: "insensitive" } }
              }
            }
          },
          {
            messages: { some: {} }
          }
        ]
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
        lastMessageAt: "asc"
      }
    });

    return conversations;
  } catch (err: unknown) {
    console.log(err);
    return null;
  }
}

export default getConversations;
