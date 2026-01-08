import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const shareRequests = await prisma.shareRequest.findMany({
    orderBy: {
      requestDate: "desc",
    },
  });

  return NextResponse.json(shareRequests);
}
