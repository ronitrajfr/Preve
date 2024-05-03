import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { readPdfText } from "pdf-text-reader";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { imageUrl, userId } = await req.json();
  try {
    if (!imageUrl || !userId) {
      return;
    }
    const content: string = await readPdfText({ url: imageUrl });

    const newPost = await prisma.post.create({
      data: {
        imageUrl,
        createdById: userId,
        content,
      },
    });

    return NextResponse.json({ newPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
