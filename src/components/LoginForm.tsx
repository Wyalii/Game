"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UsersContext } from "@/app/page";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const context = useContext(UsersContext);

  if (context === null) {
    return <div>Loading...</div>;
  }

  const { hasAccount, setHasAccount } = context;
  const [UserEmail, setUserEmail] = useState<string>("");
  const [UserPassword, setUserPassword] = useState<string>("");

  async function Login() {
    try {
      const request = await fetch("api/users/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: UserEmail,
          password: UserPassword,
        }),
      });

      const response = await request.json();

      if (!request.ok) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
        router.push(response.redirectTo);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-3/4 w-2/4 bg-white rounded flex items-center flex-col gap-5 pt-3">
      <Image
        alt="Shield image"
        src="/shield.png"
        width={100}
        height={100}
        className="w-[100px]"
      ></Image>

      <div className="flex justify-center flex-col items-center">
        <h1 className="font-mono text-md md:text-3xl">Login to Your Account</h1>
        <p className="text-sm text-gray-500">Provide your details.</p>
      </div>

      <div className="flex flex-col w-full gap-8">
        <div className="w-full flex justify-center">
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="placeholder:text-xs sm:placeholder:text-sm sm: w-1/2 max-w-xs h-10 focus:outline-none text-center bg-purple-600 text-white placeholder-white rounded"
          ></input>
        </div>

        <div className="w-full flex justify-center">
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="placeholder:text-xs sm:placeholder:text-sm sm: w-1/2 max-w-xs focus:outline-none h-10 text-center bg-purple-600 text-white placeholder-white rounded"
          ></input>
        </div>

        <div className="w-full flex justify-center">
          <button
            onClick={Login}
            className="placeholder:text-xs sm:placeholder:text-sm sm: w-1/2 max-w-xs focus:outline-none h-10 text-center bg-purple-600 text-white placeholder-white rounded"
          >
            Login
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <div>Dont have an account?</div>
        <div onClick={() => setHasAccount(false)} className="cursor-pointer">
          Register
        </div>
      </div>
    </div>
  );
}
