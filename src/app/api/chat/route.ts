import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, userId } = await req.json();
  return NextResponse.json({ userId, id });
}
