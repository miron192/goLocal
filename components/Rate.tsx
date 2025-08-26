"use client";
import { useState } from "react";

const Rate = ({ cityId }: { cityId: string }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveRating = async (score: number) => {
    setLoading(true);
    setError(null);

    try {
      // Exemplu: apelează un API pentru a salva ratingul
      // const res = await fetch("/api/rating", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ cityId, score }),
      //   credentials: "include",
      // });
      // if (!res.ok) throw new Error("Failed to save rating");

      // Simulare succes
      await new Promise((r) => setTimeout(r, 1000));

      setRating(score);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {" "}
      {rating > 0 && !loading && (
        <span className="ml-2 text-sm text-gray-700">{rating} / 5</span>
      )}{" "}
      {loading && <span className="ml-2 text-sm text-gray-500">Saving...</span>}
      {error && <span className="ml-2 text-sm text-red-500">{error}</span>}
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        return (
          <button
            key={index}
            type="button"
            onClick={() => saveRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none hover:cursor-pointer"
            disabled={loading}
          >
            <span
              className={`text-2xl transition ${
                starValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-400"
              }`}
            >
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Rate;
