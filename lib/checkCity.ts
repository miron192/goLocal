import { db } from "./db";

export const checkCity = async ({
  cityId,
  cityName,
}: {
  cityId: string;
  cityName?: string;
}) => {
  const city = await db.city.findUnique({
    where: {
      googlePlaceId: cityId,
    },
  });

  if (city) {
    return db.city.update({
      where: { googlePlaceId: cityId },
      data: { cityName },
    });
  }

  return db.city.create({
    data: {
      googlePlaceId: cityId,
      cityName: cityName ?? "",
    },
  });
};
