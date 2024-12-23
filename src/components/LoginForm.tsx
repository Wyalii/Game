"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ExistingUserContext } from "@/app/lib/ExistingUserContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import * as EmailValidator from "email-validator";

export default function LoginForm() {
  const router = useRouter();
  const context = useContext(ExistingUserContext);
  const [UserEmail, setUserEmail] = useState<string>("");
  const [UserPassword, setUserPassword] = useState<string>("");

  if (context === null) {
    return <div>Loading...</div>;
  }

  const { hasAccount, setHasAccount } = context;

  async function Login() {
    if (EmailValidator.validate(UserEmail)) {
      try {
        console.log(hasAccount);
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
    } else {
      toast.error("invalid email input.");
    }
  }

  return (
    <div className="w-4/5 h-auto sm:w-2/4 bg-white rounded flex items-center flex-col gap-5 p-4">
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
            className="w-full placeholder:text-xs sm:placeholder:text-sm sm:w-1/2 max-w-xs h-10 focus:outline-none text-center bg-purple-600 text-white placeholder-white rounded"
          ></input>
        </div>

        <div className="w-full flex justify-center">
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full placeholder:text-xs sm:placeholder:text-sm sm:w-1/2 max-w-xs focus:outline-none h-10 text-center bg-purple-600 text-white placeholder-white rounded"
          ></input>
        </div>

        <div className="w-full flex justify-center">
          <button
            onClick={Login}
            className="w-full placeholder:text-xs sm:placeholder:text-sm sm:w-1/2 max-w-xs focus:outline-none h-10 text-center bg-purple-600 text-white placeholder-white rounded"
          >
            Login
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center sm:gap-2">
        <div>Dont have an account?</div>
        <div onClick={() => setHasAccount(false)} className="cursor-pointer">
          Register
        </div>
      </div>
    </div>
  );
}
