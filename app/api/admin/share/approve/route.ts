// import { error } from "console"
import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
   try {
     const {requestId}=await req.json()
     if(!requestId) return NextResponse.json(
        {error:"requesId is required"},
        {status:404}
     )
     
     const shareReq=await prisma.shareRequest.findUnique({
        where:{id:requestId}
     })

         if (!shareReq) {
      return NextResponse.json(
        { error: "Share request not found" },
        { status: 404 }
      );
    }

    if (shareReq.status !== "pending") {
      return NextResponse.json(
        { error: "Request already processed" },
        { status: 400 }
      );
    }

     await prisma.$transaction(async (tx) => {
      await tx.shareRequest.update({
        where: { id: requestId },
        data: { status: "approved" },
      });

      // Create actual multiple shares
      const shares = Array.from(
        { length: shareReq.numberOfShares },
        (_, i) => ({
          userId: shareReq.userId,
          shareNumber: i + 1,
          amount: shareReq.amountPerShare,
        })
      );

      await tx.share.createMany({
        data: shares,
      });
    });

    return NextResponse.json({
      message: "Share request approved successfully",
    });

   } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
   }
}