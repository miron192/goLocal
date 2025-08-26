"use client";

import { useEffect, useRef } from "react";

interface Props {
  onSelect: (placeId: string, name: string) => void;
  placeholder?: string;
}

export default function CityAutocompleteInput({
  onSelect,
  placeholder,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Verificăm periodic dacă Google a fost încărcat
    const interval = setInterval(() => {
      if (window.google?.maps?.places && inputRef.current) {
        clearInterval(interval);

        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          { types: ["(cities)"] }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place && place.place_id) {
            onSelect(place.place_id, place.name || "");
          }
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder || "Search for a city..."}
      className="border p-2 rounded-xl"
    />
  );
}
