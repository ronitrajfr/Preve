import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const newPost = await prisma.post.create({
      data: {
        createdById: body.userId,
        imageUrl: body.imageUrl,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
