import prisma from "@/app/lib/prisma";
// import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {clerkId,email,fullName}=await req.json();
    if(!clerkId || !email) return NextResponse.json(
       { error:"Missing Fields"},
        {status:400}
    )
    const exisitingUser=await prisma.user.findFirst({
        where:{
            OR:[
                {clerkId},
                {email}
            ]
        }
    })

    if(exisitingUser){
        return NextResponse.json({
            exists:true,
            user:exisitingUser
        })
    }
    const newUser=await prisma.user.create({
        data:{
            clerkId:clerkId,
            name:fullName,
            email:email,
        }
    })
    console.log(newUser)
    if(!newUser) return NextResponse.json({error:"error creaitng user"},{status:400})
    
        return NextResponse.json({
            user:newUser,
            created:true
        })

}