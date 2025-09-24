import { z } from "zod";

const startLocation = z.object({
  type: z.string(),
  coordinates: z.array(z.float32()),
  address: z.string(),
  description: z.string(),
});

const tour = z.object({
  _id: z.string(),
  name: z.string(),
  imageCover: z.string(),
  maxGroupSize: z.number(),
  difficulty: z.string(),
  duration: z.number(),
  summary: z.string(),
  description: z.string(),
  ratingsAverage: z.number(),
  ratingsQuantity: z.number(),
  price: z.number(),
  createdAt: z.date(),
  images: z.array(z.string()),
  startDates: z.array(z.date()),
  startLocation: startLocation,
  locations: z.array(startLocation),
  guides: z.array(z.object()),
});

const tourSchema = z.object({ tours: z.array(tour) });

type Tour = z.infer<typeof tour>;

export type { Tour };
export { tourSchema };
