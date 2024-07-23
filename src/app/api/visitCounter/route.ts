import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");
  const linkId = searchParams.get("link");

  if (!userId || !linkId) {
    return new NextResponse(null, { status: 403 });
  }

  await db.linkClicks.create({
    data: {
      link: { connect: { id: Number(linkId) } },
      user: { connect: { id: userId } },
    },
  });

  return new NextResponse(null, { status: 200 });
}
