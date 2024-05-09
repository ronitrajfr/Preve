import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { readPdfText } from "pdf-text-reader";

export async function POST(req: NextRequest) {
  const { name, url, userId } = await req.json();

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
        createdById: userId,
      },
    });

    return NextResponse.json({ newPdf }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const allPdf = await prisma.pdf.findMany({
      where: {
        createdById: userId,
      },
    });
    return NextResponse.json({ allPdf }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
