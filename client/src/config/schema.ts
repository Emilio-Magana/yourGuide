import { z } from "zod";

const startLocationLocal = z.object({
  type: z.string(),
  coordinates: z.array(z.float32()),
  description: z.string(),
});

const tourLocal = z.object({
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
  createdAt: z.string(),
  images: z.array(z.string()),
  startDates: z.array(z.string()),
  startLocation: startLocationLocal,
  locations: z.array(startLocationLocal),
  guides: z.array(z.any()),
});

const startLocation = z.object({
  type: z.string(),
  coordinates: z.array(z.float32()),
  address: z.string(),
  description: z.string(),
});

const tour = z.object({
  _id: z.object({ $oid: z.string() }),
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
  createdAt: z.string(),
  images: z.array(z.string()),
  startDates: z.array(z.string()),
  startLocation: startLocation,
  locations: z.array(startLocation),
  guides: z.array(z.any()),
});

const tourSchema = z.object({ tours: z.array(tour) });
type TourLocal = z.infer<typeof tourLocal>;

const tourSchemaLocal = z.array(tourLocal);
type Tour = z.infer<typeof tour>;

export type { TourLocal, Tour };
export { tourSchemaLocal, tourSchema };
