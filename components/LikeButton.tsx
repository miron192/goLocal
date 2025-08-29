"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { handleLike } from "@/app/actions/like";

export default function LikeButton({
  postId,
  likes,
  initialLiked = false,
}: {
  postId: string;
  likes: number;
  initialLiked?: boolean;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(likes);
  const [animate, setAnimate] = useState(false);

  const toggleLike = async () => {
    setLiked(!liked);
    setAnimate(true);
    setCount((prev) => (liked ? prev - 1 : prev + 1));

    await handleLike(postId); // backend call

    setTimeout(() => setAnimate(false), 100); // animatie revine la normal
  };

  return (
    <button
      onClick={toggleLike}
      className="flex items-center gap-1 transition-colors"
    >
      <Heart
        fill={liked ? "red" : "none"}
        className={`w-5 h-5 transition-transform duration-100 ${
          liked ? "text-red-500" : "text-gray-600"
        } ${animate ? "scale-150" : "scale-100"}`}
      />
      <span>{count}</span>
    </button>
  );
}
