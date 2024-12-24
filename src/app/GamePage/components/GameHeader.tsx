"use client";
import Image from "next/image";
import { useEffect } from "react";
import { UserContext } from "@/app/lib/UserContext";
import { useContext } from "react";
export default function GameHeader() {
  const context = useContext(UserContext);
  const { Coins, setCoins, email } = context;
  useEffect(() => {
    async function FetchUserCoins() {
      const request = await fetch("api/users/GetUserCoins", {
        method: "POST",
        body: JSON.stringify({ email: email }),
      });

      const response = await request.json();
      setCoins(response.Coins);
    }
    if (email) {
      FetchUserCoins();
    }
  }, [context, email, Coins, setCoins]);

  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white w-full h-9 flex justify-start items-center gap-6">
      <p>User: {email}</p>
      <div className="flex items-center justify-center gap-2">
        <p>Coins: {Coins}</p>
        <Image src={"/coin.gif"} alt="coin" height={20} width={20}></Image>
      </div>
    </div>
  );
}
