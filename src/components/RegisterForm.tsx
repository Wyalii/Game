import google from "@/images/google.svg";
import Image from "next/image";
import shield from "@/images/shield.png"

export default function RegisterForm(){
  return(
      <div className="h-3/4 w-2/4 bg-white rounded flex items-center flex-col gap-5 pt-3">
          <Image alt="Shield image" src={shield} className="w-[100px]"></Image>

          <div className="flex justify-center flex-col items-center">
             <h1 className="font-mono text-md md:text-3xl">Create Your Account</h1>
             <p className="text-sm text-gray-500">Provide your details.</p>
          </div>

          <div className="flex flex-col w-full gap-8">
            <div className="w-full flex justify-center">
              <input placeholder="Email" type="email" className="placeholder:text-xs sm:placeholder:text-sm  w-3/4 sm: w-1/2 max-w-xs h-10 focus:outline-none text-center bg-purple-600 text-white placeholder-white rounded"></input>
            </div>

            <div className="w-full flex justify-center">
              <input placeholder="Password" type="password" className="placeholder:text-xs w-3/4 sm:placeholder:text-sm sm: w-1/2 max-w-xs focus:outline-none h-10 text-center bg-purple-600 text-white placeholder-white rounded"></input>
            </div>

            <div className="w-full flex justify-center">
               <button className="placeholder:text-xs w-3/4 sm:placeholder:text-sm sm: w-1/2 max-w-xs focus:outline-none h-10 text-center bg-purple-600 text-white placeholder-white rounded">Sign Up</button>
            </div>
          </div>

          <div className="flex items-center w-full">
             <hr className="flex-grow border-t border-purple-600" />
             <span className="mx-4 text-gray-500 font-mono text-xl">OR</span>
             <hr className="flex-grow border-t border-purple-600" />
          </div>

          <div className="text-xl font-mono text-xs sm:text-lg">Register With Google</div>

          <div className="w-3/4 sm: w-1/2 max-w-xs bg-purple-600 h-12 rounded flex justify-center items-center gap-1 cursor-pointer">
            <Image src={google} alt="google logo" className="w-[50px]"></Image>
            <div className="text-white font-mono text-xs sm:text-lg">Sign Up with google</div>
          </div>


       </div>
  )
}