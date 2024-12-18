"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UsersContext } from "@/app/page";

export default function RegisterForm() {
  const router = useRouter();
  const context = useContext(UsersContext);
  if (context === null) {
    return <div>Loading...</div>;
  }
  const { setHasAccount } = context;
  const [UserEmail, setUserEmail] = useState<string>("");
  const [UserPassword, setUserPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function SignUp() {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: UserEmail,
          password: UserPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        router.push(data.redirectTo);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
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
      />

      <div className="flex justify-center flex-col items-center">
        <h1 className="font-mono text-md md:text-3xl">Create Your Account</h1>
        <p className="text-sm text-gray-500">Provide your details.</p>
      </div>

      <div className="flex flex-col w-full gap-8">
        <div className="w-full flex justify-center">
          <input
            type="email"
            placeholder="Email"
            className="placeholder:text-xs sm:placeholder:text-sm sm:w-1/2 max-w-xs h-10 focus:outline-none text-center bg-purple-600 text-white placeholder-white rounded"
            value={UserEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="w-full flex justify-center">
          <input
            type="password"
            placeholder="Password"
            className="placeholder:text-xs sm:placeholder:text-sm sm:w-1/2 max-w-xs h-10 focus:outline-none text-center bg-purple-600 text-white placeholder-white rounded"
            value={UserPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="w-full flex justify-center">
          <button
            className="placeholder:text-xs sm:placeholder:text-sm sm:w-1/2 max-w-xs h-10 text-center bg-purple-600 text-white placeholder-white rounded"
            onClick={SignUp}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <div>Already have an Account?</div>
        <div className="cursor-pointer" onClick={() => setHasAccount(true)}>
          Login
        </div>
      </div>
    </div>
  );
}
