"use client";
import {
  useKindeBrowserClient,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { createUser } from "../../services/userService.js";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, accessTokenRaw } = useKindeBrowserClient();

  useEffect(() => {
    async function register() {
      if (user) {
        try {
          const data = await createUser(user, accessTokenRaw);
          console.log("User created:", data);
          setRegistered(true);
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    }
    register();
  }, [accessTokenRaw]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center">
        I HATE 310, but client protected
      </h1>

      <LogoutLink className="mt-10 space-x-3">LOG OUT</LogoutLink>
    </div>
  );
}
