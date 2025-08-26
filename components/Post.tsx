"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import Link from "next/link";

type PostProps = {
  id: string;
  content: string;
  imageUrl?: string | null;
  createdAt: string | Date;
  author: {
    id: string;
    email: string;
    imageUrl?: string | null;
  };
  likes: { id: string; userId: string }[];
  city: { id: string; cityName: string }; // 👈 obiect, nu string
};

export default function Post({
  content,
  imageUrl,
  createdAt,
  author,
  likes,
  city, // 👈 extras
}: PostProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl border border-gray-200">
      <CardHeader className="flex items-center gap-3">
        <Link href={`/user/${author.id}`}>
          <Avatar>
            <AvatarImage
              src={author.imageUrl || undefined}
              alt={author.email}
            />
            <AvatarFallback>
              {author.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <p className="font-semibold text-gray-800">{author.email}</p>
          <p className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleDateString("ro-RO", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          {city && ( // 👈 afișat doar dacă există
            <p className="text-xs text-gray-400">{city.cityName}</p>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="post"
            className="w-full rounded-xl object-cover max-h-96"
          />
        )}
        <p className="text-gray-700 mt-3">{content}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" />
          <span>{likes.length}</span>
        </button>
      </CardFooter>
    </Card>
  );
}
