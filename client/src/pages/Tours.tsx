import { getTours } from "./../api/queries";
import Spinner from "./../ui/Spinner";
import TourCard from "./../ui/TourCard";
// import type { Tour } from "./../config/schema";
import img from "./../../../public/img/tours/tour-1-3.jpg";
import ControlPanel from "./../ui/ControlPanel";

export default function Tours() {
  const { data: tours, isLoading } = getTours();

  if (isLoading) return <Spinner />;
  if (!tours) return <div>No tours available</div>;
  // img classnamr:
  // m_window:h-72 l_window:h-96 h-60

  return (
    <section className="flex flex-col gap-2">
      <article className="relative">
        <img
          src={img}
          className="m_window:h-72 l_window:h-96 h-60 w-full rounded-b-2xl object-none duration-500"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white drop-shadow-lg">
          Tours
        </h1>
        {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-90% to-current" /> */}
      </article>
      <article className="s_window:flex-row flex flex-col gap-4 p-2">
        <ControlPanel />
        <ul className="s_window:grid-cols-1 m_window:grid-cols-2 xl_window:grid-cols-3 grid grid-cols-1 gap-2">
          {tours.map((tour: any, key: string) => (
            <TourCard {...tour} key={key} />
          ))}
        </ul>
      </article>
    </section>
  );
}

const tourLocal = [
  {
    _id: "5c88fa8cf4afda39709c2955",
    name: "The Sea Explorer",
    duration: 7,
    maxGroupSize: 15,
    secretTour: false,
    difficulty: "medium",
    ratingsAverage: 4.9,
    ratingsQuantity: 7,
    price: 497,
    summary: "Exploring the jaw-dropping US east coast by foot and by boat",
    description:
      "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    imageCover: "tour-2-cover.jpg",
    images: ["tour-2-1.jpg", "tour-2-2.jpg", "tour-2-3.jpg"],
    createdAt: {
      $date: "2025-08-05T12:23:26.489Z",
    },
    startDates: [
      "2021-06-19T09:00:00.000Z",
      "2021-07-20T09:00:00.000Z",
      "2021-08-18T09:00:00.000Z",
    ],
    startLocation: {
      type: "Point",
      coordinates: [-80.185942, 25.774772],
      address: "301 Biscayne Blvd, Miami, FL 33132, USA",
      description: "Miami, USA",
    },
    locations: [
      {
        type: "Point",
        coordinates: [-80.128473, 25.781842],
        description: "Lummus Park Beach",
        day: 1,
        _id: {
          $oid: "5c88fa8cf4afda39709c2959",
        },
      },
      {
        type: "Point",
        coordinates: [-80.647885, 24.909047],
        description: "Islamorada",
        day: 2,
        _id: {
          $oid: "5c88fa8cf4afda39709c2958",
        },
      },
      {
        type: "Point",
        coordinates: [-81.0784, 24.707496],
        description: "Sombrero Beach",
        day: 3,
        _id: {
          $oid: "5c88fa8cf4afda39709c2957",
        },
      },
      {
        type: "Point",
        coordinates: [-81.768719, 24.552242],
        description: "West Key",
        day: 5,
        _id: {
          $oid: "5c88fa8cf4afda39709c2956",
        },
      },
    ],
    guides: [
      {
        $oid: "5c8a22c62f8fb814b56fa18b",
      },
      {
        $oid: "5c8a1f4e2f8fb814b56fa185",
      },
    ],
    slug: "the-sea-explorer",
    __v: 0,
  },
  {
    _id: "5c88fa8cf4afda39709c2961",

    name: "The Park Camper",
    duration: 10,
    maxGroupSize: 15,
    secretTour: false,
    difficulty: "medium",
    ratingsAverage: 4.7,
    ratingsQuantity: 7,
    price: 1497,
    summary: "Breathing in Nature in America's most spectacular National Parks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!",
    imageCover: "tour-5-cover.jpg",
    images: ["tour-5-1.jpg", "tour-5-2.jpg", "tour-5-3.jpg"],
    createdAt: {
      $date: "2025-08-05T12:23:26.489Z",
    },
    startDates: [
      "2021-08-05T09:00:00.000Z",
      "2022-03-20T10:00:00.000Z",
      "2022-08-12T09:00:00.000Z",
    ],
    startLocation: {
      type: "Point",
      coordinates: [-115.172652, 36.110904],
      address: "3663 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
      description: "Las Vegas, USA",
    },
    locations: [
      {
        type: "Point",
        coordinates: [-112.987418, 37.198125],
        description: "Zion Canyon National Park",
        day: 1,
        _id: {
          $oid: "5c88fa8cf4afda39709c2965",
        },
      },
      {
        type: "Point",
        coordinates: [-111.376161, 36.86438],
        description: "Antelope Canyon",
        day: 4,
        _id: {
          $oid: "5c88fa8cf4afda39709c2964",
        },
      },
      {
        type: "Point",
        coordinates: [-112.115763, 36.058973],
        description: "Grand Canyon National Park",
        day: 5,
        _id: {
          $oid: "5c88fa8cf4afda39709c2963",
        },
      },
      {
        type: "Point",
        coordinates: [-116.107963, 34.011646],
        description: "Joshua Tree National Park",
        day: 9,
        _id: {
          $oid: "5c88fa8cf4afda39709c2962",
        },
      },
    ],
    guides: [
      {
        $oid: "5c8a21f22f8fb814b56fa18a",
      },
      {
        $oid: "5c8a23412f8fb814b56fa18c",
      },
      {
        $oid: "5c8a201e2f8fb814b56fa186",
      },
    ],
    slug: "the-park-camper",
    __v: 0,
  },
  {
    _id: "5c88fa8cf4afda39709c2974",
    name: "The Northern Lights",
    duration: 3,
    maxGroupSize: 12,
    secretTour: false,
    difficulty: "easy",
    ratingsAverage: 4.7,
    ratingsQuantity: 7,
    price: 1497,
    summary: "Enjoy the Northern Lights in one of the best places in the world",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!\nDolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, exercitation ullamco laboris nisi ut aliquip. Lorem ipsum dolor sit amet, consectetur adipisicing elit!",
    imageCover: "tour-9-cover.jpg",
    images: ["tour-9-1.jpg", "tour-9-2.jpg", "tour-9-3.jpg"],
    createdAt: {
      $date: "2025-08-05T12:23:26.489Z",
    },
    startDates: [
      "2021-12-16T10:00:00.000Z",
      "2022-01-16T10:00:00.000Z",
      "2022-12-12T10:00:00.000Z",
    ],
    startLocation: {
      type: "Point",
      coordinates: [-114.406097, 62.439943],
      address: "Yellowknife, NT X1A 2L2, Canada",
      description: "Yellowknife, CAN",
    },
    locations: [
      {
        type: "Point",
        coordinates: [-114.406097, 62.439943],
        description: "Yellowknife",
        day: 1,
        _id: {
          $oid: "5c88fa8cf4afda39709c2975",
        },
      },
    ],
    guides: [
      {
        $oid: "5c8a21f22f8fb814b56fa18a",
      },
      {
        $oid: "5c8a201e2f8fb814b56fa186",
      },
      {
        $oid: "5c8a23412f8fb814b56fa18c",
      },
    ],
    slug: "the-northern-lights",
    __v: 0,
  },
];
