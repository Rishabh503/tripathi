import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
   try {
     const {requestId}=await req.json()
     if(!requestId) return NextResponse.json(
        {error:"requesId is required"},
        {status:404}
     )
     
     const shareReq=await prisma.shareRequest.update({
        where:{id:requestId},
        data:{
            status:"rejected"
        }
     })

         if (!shareReq) {
      return NextResponse.json(
        { error: "Share request not found" },
        { status: 404 }
      );
    }

    // if (shareReq.status === "pending") {
    //   return NextResponse.json(
    //     { error: "Request already processed" },
    //     { status: 400 }
    //   );
    // }

    return NextResponse.json({
      message: "Share were rejeccted ",
    });

   } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
   }
}