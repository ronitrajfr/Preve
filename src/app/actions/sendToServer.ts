"use server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import { FormEvent } from "react";

export default async function sendToServer(e: any) {
  // TODO: Implement your action here
  const user = await currentUser();
  const userId = user?.publicMetadata.userId;
  if (!userId) return;
  const content = e.get("inputThing");
  console.log(content);
  // const newMessage = await prisma.message.create({
  //   data: {
  //     createdById: userId as string,
  //     content,
  //     chatId: pdfId,
  //   },
  // });
}
