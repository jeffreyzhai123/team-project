import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Dashboard() {
  const { getAccessTokenRaw } = getKindeServerSession();

  const accessTokenRaw = await getAccessTokenRaw();

  const response = await fetch("http://localhost:3001/api/protected", {
    headers: {
      Authorization: `Bearer ${accessTokenRaw}`,
    },
  });
  const data = await response.json();
  console.log(data);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center">
        I HATE 310, but server protected
      </h1>
    </div>
  );
}
