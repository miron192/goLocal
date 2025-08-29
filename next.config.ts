import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com", // Cloudinary
      "lh3.googleusercontent.com", // Google API (ex: profiluri / imagini Google)
    ],
  },
};

export default nextConfig;
