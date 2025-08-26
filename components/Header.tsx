import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import SearchBar from "./Searchbar";

export default function Header() {
  return (
    <header className="flex justify-between p-4 items-center border-2 border-gray-200/50 rounded-3xl h-20 bg-white/20 sticky z-50 shadow-xs top-0">
      <Link
        href="/"
        className="text-2xl font-bold transition-all duration-200 ease-out  hover:scale-[1.03]"
      >
        go
        <span className="text-green-600  ">Local</span>
      </Link>

      <SignedIn>
        <SearchBar />
      </SignedIn>
      <div className="">
        {" "}
        <SignedOut>
          <div className="flex gap-4">
            <SignInButton>
              <button
                className="relative overflow-hidden rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 w-28 sm:px-5 cursor-pointer 
             bg-green-600 text-white backdrop-blur-md border border-white/20 
             transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,255,128,0.25)]"
              >
                <span className="relative z-10">Sign In</span>
              </button>
            </SignInButton>
            <SignUpButton>
              <button
                className="relative overflow-hidden rounded-full font-medium text-sm sm:text-base h-10 w-28 sm:h-12 px-4 sm:px-5 cursor-pointer 
          bg-white text-green-600 backdrop-blur-md border border-green-200 
          transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,255,128,0.25)]"
              >
                <span className="relative z-10">Sign Up</span>
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
