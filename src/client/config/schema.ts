import { z } from "zod";

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
  // z.literal("lead-guide"),
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

const tourSchema = z.object({ tours: z.array(tour) });
const userSchema = z.object({ users: z.array(user) });
const reviewSchema = z.object({ reviews: z.array(review) });

type Tour = z.infer<typeof tour>;
type User = z.infer<typeof user>;
type Review = z.infer<typeof review>;
type Location = z.infer<typeof location>;
type UserRoles = z.infer<typeof userRoles>;

export { tourSchema, reviewSchema, userSchema };
export type { Tour, Review, User, UserRoles, Location };

// for some reason the user is not able to flag logging out,
// simply the user is navigated to Overview...... state issue?
// context rather than calling useAuth() in components indeividually..?
// but then whats the point of an authenticated route....?
