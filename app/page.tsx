import Guest from "@/components/Guest";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const dbUser = await checkUser();

  if (!dbUser) {
    return <Guest />;
  }

  return (
    <main className="flex flex-col items-center justify-center text-center px-6 min-h-[calc(100vh-80px)] pt-16">
      {/* Logo */}
      <h1 className="mb-6 text-5xl">
        go<span className="text-green-600">Local</span>
      </h1>

      {/* Welcome text */}
      <h1 className="text-3xl sm:text-4xl font-bold text-green-600">
        Welcome to goLocal, {dbUser.name}!
      </h1>
      <p className="mt-3 text-gray-600 max-w-md">
        Discover hidden gems, explore new places, and connect with locals in
        your favorite cities.
      </p>

      {/* Call to action */}
      <div className="mt-8 flex gap-4">
        <Link
          href="cities"
          className="relative overflow-hidden rounded-full font-medium text-sm sm:text-base h-12 px-6
          bg-green-600 text-white backdrop-blur-md border border-white/20  flex items-center
          transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,255,128,0.25)] cursor-pointer"
        >
          Explore Cities
        </Link>
        <Link
          href="profile"
          className="relative overflow-hidden rounded-full font-medium text-sm sm:text-base h-12 px-6 cursor-pointer 
          bg-white text-green-700 backdrop-blur-md border border-green-200  flex items-center
          transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,255,128,0.15)]"
        >
          My Profile
        </Link>
      </div>
    </main>
  );
}
