"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type DbUser = {
  id: string;
  email: string | null;
  name: string | null;
  role: "USER" | "ADMIN";
};

type UserContextType = {
  user: DbUser | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      setDbUser(null);
      setLoading(false);
      return;
    }

    const syncUser = async () => {
      try {
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
      } catch (err) {
        setDbUser(null);
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user]);

  return (
    <UserContext.Provider value={{ user: dbUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useDbUser() {
  return useContext(UserContext);
}
