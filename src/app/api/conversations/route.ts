import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new Response('Unauthorized', { status: 401 });
    }

    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          {
            users: { some: { userId: currentUser.id } }
          },
          {
            users: { some: { userId: body.userId } }
          }
        ]
      }
    })

    if (existingConversation) {
      return Response.json(existingConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        isGroup: false,
        users: {
          create: [
            { User: { connect: { id: currentUser.id } } },
            { User: { connect: { id: body.userId } } }
          ]
        }
      },
      include: {
        users: true
      }
    })

    return Response.json(newConversation);
  } catch (err: any) {
    console.log(err)
    return new Response('Internal error', { status: 500 });
  }
}
