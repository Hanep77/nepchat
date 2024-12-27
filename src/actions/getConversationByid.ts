import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: id
      },
      include: {
        messages: true,
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
      }
    })
    return conversation
  } catch (err: any) {
    return null;
  }
}

export default getConversationById;
