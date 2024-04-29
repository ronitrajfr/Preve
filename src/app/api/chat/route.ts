import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { readPdfText } from "pdf-text-reader";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId, imageUrl } = await req.json();
  try {
    const pdfText = await readPdfText({
      url: imageUrl,
    });
    const newPost = await prisma.post.create({
      data: {
        createdById: userId,
        imageUrl,
        content: pdfText,
      },
    });
    return NextResponse.json({ newPost });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

// export async function POST(req: NextRequest) {
//   const body = await req.json();

//   try {
//     const pdfText = await readPdfText({
//       url: body.imageUrl, // Adjust the file name if needed
//     });

//     const newPost = await prisma.post.create({
//       data: {
//         createdById: body.userId,
//         imageUrl: body.imageUrl,
//         content: pdfText, // Store the parsed text from the PDF
//       },
//     });
//     return NextResponse.json({ newPost });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error });
//   }
// }
