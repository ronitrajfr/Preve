import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const { chatId, userId, content } = await req.json();

  // try {
  //   const newMsg = await prisma.message.create({
  //     data: {
  //       createdById: userId,
  //       chatId,
  //       content,
  //     },
  //   });
  return NextResponse.json({ newMsg: "lfalsdlaks" }, { status: 200 });
}
