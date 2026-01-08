"use client";
import { useDbUser } from "@/app/context/UserContext";

export default function Trial() {
  const { user, loading } = useDbUser();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;
console.log("user from user exists",user)
  return <p>Hello {user.name}</p>;
}
