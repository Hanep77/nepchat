import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function POST(request: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  const body = await request.json();
  const { conversationId } = await params;
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const createChat = await prisma.message.create({
      data: {
        body: body.message,
        conversationId: conversationId,
        senderId: currentUser.id
      }
    })

    return Response.json(createChat);
  } catch (err: any) {
    return new Response('Internal error', { status: 500 });
  }
}
