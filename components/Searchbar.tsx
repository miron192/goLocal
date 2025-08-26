"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CitySearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!window.google) return; // API-ul nu e încă gata

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current!,
      { types: ["(cities)"] }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.place_id) {
        router.push(`/cities/${place.place_id}`);
      }
    });
  }, [router]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search for a city..."
      className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full shadow-sm 
                 focus:ring-2 focus:ring-green-500 focus:border-green-500"
    />
  );
}
