"use client";

import { useState } from "react";
import { createPostWithImage } from "../actions/createPostWithImage";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import CityAutocompleteInput from "@/components/CityAutocompleteInput";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cityId, setCityId] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const content = formData.get("content")?.toString().trim();
    const file = formData.get("file") as File;

    if (!content) {
      setError("Description is required.");
      return;
    }
    if (!file || file.size === 0) {
      setError("Image is required.");
      return;
    }
    if (!cityId) {
      setError("City is required.");
      return;
    }

    formData.append("cityId", cityId);

    try {
      setLoading(true);
      await createPostWithImage(formData);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white/30 p-6 rounded-3xl">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

      <SignedOut>
        <div className="flex flex-col items-center gap-4">
          <p>You need to sign in to create a post.</p>
          <SignInButton>
            <button className="bg-green-600 text-white rounded-full px-5 py-2">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            name="content"
            className="border p-3 rounded-xl"
            placeholder="What's on your mind?"
          />
          {/* City Autocomplete Input */}
          <CityAutocompleteInput
            onSelect={(id, name) => {
              setCityId(id);
              setCityName(name);
            }}
            placeholder="Search for a city..."
          />
          {cityName && (
            <p className="text-sm text-gray-500">Selected city: {cityName}</p>
          )}
          <input
            type="file"
            name="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="border-green-600 border-2 text-black rounded-full px-5 py-2 cursor-pointer flex items-center justify-center transition-all duration-200 ease-out   hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,255,128,0.25)"
          >
            Choose Image
          </label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="rounded-xl max-h-80 object-cover"
            />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-white cursor-pointer rounded-full py-3 px-6 transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,255,128,0.25)]
              ${loading ? "animate-pulse opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </SignedIn>
    </div>
  );
}
