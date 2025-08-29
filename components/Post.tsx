"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { deletePost } from "@/app/actions/deletePost"; // 👈 import acțiunea server
import Image from "next/image";

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
  city: { id: string; cityName: string };
  isOwner?: boolean;
};

export default function Post({
  id,
  content,
  imageUrl,
  createdAt,
  author,
  likes,
  city,
  isOwner,
}: PostProps) {
  async function handleDelete() {
    try {
      await deletePost(author.id, id); // 👈 apel direct
      window.location.reload(); // sau un state update
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl border border-gray-200 mt-5 relative">
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
          {city && <p className="text-xs text-gray-400">{city.cityName}</p>}
        </div>

        {/* Buton delete doar pt owner */}
        {isOwner && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            ✖
          </button>
        )}
      </CardHeader>

      <CardContent>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="post"
            className="w-full rounded-xl object-cover max-h-96"
            width={384}
            height={384}
          />
        )}
        <p className="text-gray-700 mt-3">{content}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <LikeButton postId={id} likes={likes.length} />
      </CardFooter>
    </Card>
  );
}
