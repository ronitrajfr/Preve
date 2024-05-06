import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { readPdfText } from "pdf-text-reader";

export async function POST(req: NextRequest) {
  const { name, url } = await req.json();

  try {
    const content = await readPdfText({
      url,
    });
    console.log(content);

    const newPdf = await prisma.pdf.create({
      data: {
        url,
        name,
        content,
      },
    });

    return NextResponse.json({ newPdf }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
