import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { readPdfText } from "pdf-text-reader";
import axios from "axios"; // Import axios for making HTTP requests
const prisma = new PrismaClient();

function delay(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const pdfText = await readPdfText({
      url: body.imageUrl, // Adjust the file name if needed
    });

    // Add a delay of 5 seconds before making the database call
    await delay(5000);

    const newPost = await prisma.post.create({
      data: {
        createdById: body.userId,
        imageUrl: body.imageUrl,
        content: pdfText, // Store the parsed text from the PDF
      },
    });
    return NextResponse.json({ newPost });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
