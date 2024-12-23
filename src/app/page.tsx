"use client";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import React, { useState } from "react";
import { ExistingUserContext } from "./lib/ExistingUserContext";

export default function Home() {
  const [hasAccount, setHasAccount] = useState<boolean>(false);

  return (
    <ExistingUserContext.Provider value={{ hasAccount, setHasAccount }}>
      <div className="h-full bg-slate-700 flex items-center justify-center">
        {hasAccount ? <LoginForm></LoginForm> : <RegisterForm></RegisterForm>}
      </div>
    </ExistingUserContext.Provider>
  );
}
