import { getCityData } from "@/app/actions/getCityData";
import { getPostsByCity } from "@/app/actions/getPostsByCity";
import Post from "@/components/Post";
import Image from "next/image";

export default async function page(props: {
  params: Promise<{ city: string }>;
}) {
  const params = await props.params;
  const city = await getCityData(params.city);
  const posts = await getPostsByCity(params.city, 1, 10, city.name);

  if (!city)
    return (
      <div className="max-w-xl mx-auto mt-20 p-6 text-center text-red-600 font-semibold rounded-3xl border border-red-300 bg-red-50">
        City not found.
      </div>
    );

  // Helper to generate photo URL
  const getPhotoUrl = (photo_reference: string, maxwidth = 400) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API || "YOUR_API_KEY";
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photo_reference=${photo_reference}&key=${apiKey}`;
  };

  return (
    <main>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white/30 backdrop-blur-md border-2 border-gray-200/50 rounded-3xl shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold mb-4 text-gray-800">
            City: <span className="text-green-600">{city.name}</span>
          </h1>
        </div>

        <p className="mb-2 text-gray-700">
          <strong>Address:</strong> {city.formatted_address || "N/A"}
        </p>

        <p className="mb-2 text-gray-700">
          <strong>Coordinates:</strong> {city.geometry.location.lat},{" "}
          {city.geometry.location.lng}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Time zone (UTC offset):</strong> {city.utc_offset / 60} hours
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Photos:</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {city.photos?.map((photo: any) => (
            <Image
              key={photo.photo_reference}
              src={getPhotoUrl(photo.photo_reference)}
              alt={`Photo from ${city.name}`}
              className="w-48 h-48 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 ease-out cursor-pointer object-cover"
              width={192}
              height={192}
            />
          ))}
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white/30 backdrop-blur-md border-2 border-gray-200/50 rounded-3xl shadow-md">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-800">
          Latest Posts:
        </h1>
        {posts?.map((post) => (
          <Post
            key={post.id}
            city={{ id: city.id, cityName: city.name }}
            {...post}
          />
        ))}
      </div>
    </main>
  );
}
