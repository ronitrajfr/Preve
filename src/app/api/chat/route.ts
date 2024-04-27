import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (userId === null) {
    return;
  }

  console.log(userId);
  try {
    const body = await req.json();
    const newPdf = await prisma.post.create({
      data: {
        imageUrl: body.imageUrl,
        createdById: userId,
      },
    });
    return NextResponse.json({ newPdf }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
