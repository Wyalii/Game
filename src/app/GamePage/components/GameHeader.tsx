"use client";
import GetUserEmail from "@/app/lib/GetUserEmail";
import { useState, useEffect } from "react";

export default function GameHeader() {
  const [userEmail, SetUserEmail] = useState("");
  const fetchEmail = async () => {
    const email = await GetUserEmail();
    SetUserEmail(email || "");
  };

  useEffect(() => {
    fetchEmail();
  }, []);
  return <div className="bg-white w-full h-9">{userEmail}</div>;
}
