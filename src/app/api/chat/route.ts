import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import axios from "axios";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { imageUrl, userId } = await req.json();

  try {
    // Fetch PDF content
    const pdfContent = await fetchPdfContent(imageUrl);

    // Store data in the database
    await savePdfData(imageUrl, userId, pdfContent);

    // Respond with success message and userId
    return NextResponse.json({
      message: "PDF data saved successfully",
      userId,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

async function fetchPdfContent(imageUrl: string) {
  try {
    // Fetch the PDF file using Axios
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer", // Ensure response type is set to arraybuffer
    });

    // Parse the PDF content
    const data = await pdfParse(response.data);

    // Extract text content from the parsed data
    const textContent = data.text;

    return textContent;
  } catch (error) {
    console.error("Error fetching PDF content:", error);
    throw new Error("Failed to fetch PDF content");
  }
}

async function savePdfData(
  imageUrl: string,
  userId: string,
  pdfContent: string
) {
  // Save data in the database using Prisma
  await prisma.post.create({
    data: {
      imageUrl: imageUrl,
      createdById: userId,
      content: pdfContent,
    },
  });
}
