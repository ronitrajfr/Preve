import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";
import fs from "fs";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    let dataBuffer = fs.readFileSync(body.imageUrl);

    const pdfContent = await pdf(dataBuffer);

    console.log(pdfContent.text);

    const newPost = await prisma.post.create({
      data: {
        createdById: body.userId,
        imageUrl: body.imageUrl,
        content: pdfContent.text,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
