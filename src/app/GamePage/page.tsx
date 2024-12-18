"use client";
import GameHeader from "./components/GameHeader";
import QuestionCard from "./components/QuestionCard";
import React, { createContext, useState } from "react";
import GetUserEmail from "@/app/lib/GetUserEmail";
import { useEffect } from "react";
type User = {
  Coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export const User = createContext<User | null>(null);
export default function GamePage() {
  const [Coins, setCoins] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const getEmailFromToken = GetUserEmail();
    if (getEmailFromToken) {
      setEmail(getEmailFromToken);
    }
  }, []);
  return (
    <User.Provider value={{ Coins, setCoins, email, setEmail }}>
      <div className="bg-fuchsia-900 h-full w-full flex flex-col gap-4 items-center">
        <GameHeader />
        <QuestionCard />
      </div>
    </User.Provider>
  );
}
