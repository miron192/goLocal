"use server";

import { checkCity } from "@/lib/checkCity";

export async function getCityData(placeId: string) {
  if (!placeId) {
    console.error("Nu ai trimis placeId");
    return null;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API!;
  if (!apiKey) {
    console.error("Lipseste cheia API");
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
    placeId
  )}&fields=formatted_address,website,user_ratings_total,opening_hours,photos,geometry,name,types,utc_offset&key=${apiKey}`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Eroare Google API:", res.status, res.statusText);
    return null;
  }

  try {
    const data = await res.json();

    if (data.status !== "OK") {
      console.error("Google Places error:", data.status, data.error_message);
      return null;
    }

    const cityName = data.result.name;

    await checkCity({
      cityId: placeId,
      cityName,
    });

    return data.result;
  } catch (e) {
    console.error("Eroare la parsarea JSON:", e);
    return null;
  }
}
