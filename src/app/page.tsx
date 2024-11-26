"use client";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import React, { createContext, useContext, useState } from "react";

type UsersContextType = {
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UsersContext = createContext<UsersContextType | null>(null);

export default function Home() {
  const [hasAccount, setHasAccount] = useState<boolean>(false);

  return (
    <UsersContext.Provider value={{ hasAccount, setHasAccount }}>
      <div className="h-full bg-slate-700 flex items-center justify-center">
        {hasAccount ? <LoginForm></LoginForm> : <RegisterForm></RegisterForm>}
      </div>
    </UsersContext.Provider>
  );
}
