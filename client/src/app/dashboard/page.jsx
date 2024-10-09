"use client";
import {
  useKindeBrowserClient,
  LogoutLink,
  useKindeAuth
} from "@kinde-oss/kinde-auth-nextjs";
import { createUser } from "../../services/userService.js";
import { useContext, useEffect } from "react";
import Link from 'next/link';
import { UserContext } from "../context/UserContext.js";


export default function Dashboard() {
  const { user, accessTokenRaw } = useKindeBrowserClient();
  const { isAuthenticated } = useKindeAuth();
  const { setUser } = useContext(UserContext);


  useEffect(() => {
    async function register() {
      if (user) {
        try {
          //to debug
          console.log(user.id);
          console.log(user.email);
          console.log(isAuthenticated);

          const data = await createUser(user, accessTokenRaw);
          console.log("User created:", data);
          setUser(user);
          // setRegistered(true);
          localStorage.setItem("user", JSON.stringify(user));
          console.log(localStorage.getItem("user"));
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

      {/* help me to see the profile page..can be changed later */}
      <Link href="../profile">My Profile</Link>
     
      <LogoutLink className="mt-10 space-x-3">LOG OUT</LogoutLink>
    </div>
   
    
  );
}
