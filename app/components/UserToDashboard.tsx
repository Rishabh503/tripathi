"use client";
import { useDbUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
// import { Router } from "next/router";

export default function UserToDashboard() {
  const { user, loading } = useDbUser();
  const router=useRouter()

//   if (loading) return <p>Loading...</p>;
//   if (!user) return <p>Not logged in</p>;
console.log("user from user exists",user)

if(user){
  router.push(`/dashboard/${user.id}`)
}
return
  // return <p>Hello {user.name}</p>;
}
