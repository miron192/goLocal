import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Guest() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-6 min-h-[calc(100vh-80px)] bg-gradient-to-b from-green-50 to-white">
      {/* Logo */}
      <h1 className="mb-6 text-5xl font-bold">
        go<span className="text-green-600">Local</span>
      </h1>

      {/* Message */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-green-700">
        Discover your city with goLocal
      </h2>
      <p className="mt-3 text-gray-600 max-w-md">
        Join locals sharing their favorite spots — from hidden gems to popular
        attractions.
      </p>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
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
    </main>
  );
}
