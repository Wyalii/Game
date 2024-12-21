"use client";

import { useEffect } from "react";
import { User } from "../page";
import { useContext } from "react";
export default function GameHeader() {
  const context = useContext(User);
  if (!context) {
    return <div>Loading...</div>;
  }

  const { Coins, setCoins, email } = context;

  useEffect(() => {
    if (email) {
      FetchUserCoins();
    }
  }, [email, Coins]);

  async function FetchUserCoins() {
    const request = await fetch("api/users/GetUserCoins", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    });

    const response = await request.json();
    setCoins(response.Coins);
    console.log(response.message);
  }

  return (
    <div className="bg-white w-full h-9 flex justify-start items-center gap-6">
      <p>User: {email}</p>
      <p>Coins: {Coins}</p>
    </div>
  );
}
