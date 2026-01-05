"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { isSignedIn, user, isLoaded } = useUser();

  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Hook ALWAYS runs, but logic inside is conditional
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const checkUser = async () => {
      const res = await fetch("/api/usercreation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
        }),
      });

      const data = await res.json();
      setDbUser(data.user);
      setLoading(false);
    };

    checkUser();
  }, [isLoaded, isSignedIn, user]);

  // ✅ Returns come AFTER hooks
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Sign in to view this page</div>;
  if (loading) return <div>Checking user...</div>;

  return
//   return (
//     <div>
//       <p>Welcome back, {dbUser?.email}</p>
//     </div>
//   );
}
