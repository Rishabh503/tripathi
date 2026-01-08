import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, numberOfShares } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "UserId is required" },
        { status: 400 }
      );
    }

    if (!numberOfShares || numberOfShares <= 0) {
      return NextResponse.json(
        { error: "Invalid number of shares" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    const amountPerShare = 100;
    const totalAmount = numberOfShares * amountPerShare;

    const shareRequest = await prisma.shareRequest.create({
      data: {
        userId: user.id, 
        numberOfShares,
        amountPerShare,
        totalAmount,
      },
    });

    return NextResponse.json(
      {
        message: "Share request created successfully",
        shareRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function GET(req:Request) {
//   const shareRequestsForAdmin=
// }