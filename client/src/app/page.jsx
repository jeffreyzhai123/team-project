"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center">I HATE 310</h1>

      <LoginLink className="mt-10 space-x-3">LOG IN</LoginLink>
    </div>
  );
}
