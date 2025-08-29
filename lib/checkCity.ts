import { db } from "./db";

export const checkCity = async ({
  cityId,
  cityName,
}: {
  cityId: string;
  cityName?: string;
}) => {
  const city = await db.city.findUnique({
    where: { googlePlaceId: cityId },
  });

  if (city) {
    if (cityName && cityName !== city.cityName) {
      return db.city.update({
        where: { googlePlaceId: cityId },
        data: { cityName },
      });
    }
    return city;
  }

  if (!cityName) {
    throw new Error("cityName is required to create a new city");
  }

  return db.city.create({
    data: {
      googlePlaceId: cityId,
      cityName,
    },
  });
};
