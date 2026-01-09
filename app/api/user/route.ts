import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId is required" },
      { status: 400 }
    );
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include:{
        shares: {
        orderBy: {
          purchaseDate: "desc",
        },
      },
    }
  });

  console.log(userData)
  if (!userData) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    user: userData,
  });
}
