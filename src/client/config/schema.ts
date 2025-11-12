import { z } from "zod";

// const startLocationLocal = z.object({
//   type: z.string(),
//   coordinates: z.array(z.float32()),
//   description: z.string(),
// });

// const tourLocal = z.object({
//   _id: z.string(),
//   name: z.string(),
//   imageCover: z.string(),
//   maxGroupSize: z.number(),
//   difficulty: z.string(),
//   duration: z.number(),
//   summary: z.string(),
//   description: z.string(),
//   ratingsAverage: z.number(),
//   ratingsQuantity: z.number(),
//   price: z.number(),
//   createdAt: z.string(),
//   images: z.array(z.string()),
//   startDates: z.array(z.string()),
//   startLocation: startLocationLocal,
//   locations: z.array(startLocationLocal),
//   guides: z.array(z.any()),
// });

const startLocation = z.object({
  type: z.string(),
  coordinates: z.array(z.float32()),
  address: z.string(),
  description: z.string(),
});
const location = z.object({
  type: z.string(),
  coordinates: z.array(z.float32()),
  description: z.string(),
  day: z.string(),
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
  createdAt: z.string(),
  images: z.array(z.string()),
  startDates: z.array(z.string()),
  startLocation: startLocation,
  locations: z.array(location),
  guides: z.array(z.any()),
});
const userRoles = z.union([
  z.literal("user"),
  z.literal("admin"),
  z.literal("lead-guide"),
  z.literal("guide"),
]);
const user = z.object({
  _id: z.string(),
  role: userRoles,
  name: z.string(),
  email: z.email(),
  photo: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});
const review = z.object({
  _id: z.string(),
  review: z.string(),
  rating: z.number(),
  tour: z.string(),
  user: user,
  createdAt: z.string(),
});

// const tourSchemaLocal = z.array(tourLocal);
const tourSchema = z.object({ tours: z.array(tour) });
const reviewSchema = z.object({ reviews: z.array(review) });
const userSchema = z.object({ users: z.array(user) });

// type TourLocal = z.infer<typeof tourLocal>;
type Tour = z.infer<typeof tour>;
type Review = z.infer<typeof review>;
type User = z.infer<typeof user>;
type UserRoles = z.infer<typeof userRoles>;

export type { Tour, Review, User, UserRoles };
export { tourSchema, reviewSchema, userSchema };
