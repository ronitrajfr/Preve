import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";
import axios from "axios"; // Import axios for making HTTP requests
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    // Fetch the PDF content from the URL
    const response = await axios.get(body.imageUrl, {
      responseType: "arraybuffer",
    });
    const pdfContent = await pdf(response.data);

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
