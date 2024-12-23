"use client";
import GameHeader from "./components/GameHeader";
import Question from "./components/Question";
import React, { useState } from "react";
import GetUserEmail from "@/app/lib/GetUserEmail";
import { useEffect } from "react";
import { UserContext } from "../lib/UserContext";

export default function GamePage() {
  const [Coins, setCoins] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const getEmailFromToken = GetUserEmail();
    console.log("Extracted email from token:", getEmailFromToken);
    if (getEmailFromToken) {
      setEmail(getEmailFromToken);
    }
  }, []);
  return (
    <UserContext.Provider value={{ Coins, setCoins, email, setEmail }}>
      <div className="bg-fuchsia-900 h-full w-full flex flex-col gap-4 items-center">
        <GameHeader />
        <Question />
      </div>
    </UserContext.Provider>
  );
}
