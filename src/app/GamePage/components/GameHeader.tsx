"use client";
import GetUserEmail from "@/app/lib/GetUserEmail";
import { useState, useEffect } from "react";

export default function GameHeader() {
  const [userEmail, SetUserEmail] = useState("");

  useEffect(() => {
    const email = GetUserEmail();
    SetUserEmail(email || "");
  }, []);
  return (
    <div className="bg-white w-full h-9 flex justify-start items-center gap-6">
      <p>User: {userEmail}</p>
      <p>Coins:0</p>
    </div>
  );
}
