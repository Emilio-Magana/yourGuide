import { FaArrowTrendUp, FaCalendar, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { convertDate } from "../utils/convertDate";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { useRef, type RefObject } from "react";

const API_URL = "http://localhost:3000";
type Section = {
  id: string;
};

const tourSections: Section[] = [
  { id: "Overview" },
  { id: "Map" },
  { id: "Reviews" },
  { id: "Price" },
];

export default function TourDetails() {
  // const { tourId } = useParams();
  // const { data: tour, isLoading } = getTour(tourId!);

  // if (isLoading) return <div>Loading....</div>;
  // if (!tour) return <div>No tour found</div>;
  const api_key = import.meta.env.VITE_API_URL;
  console.log(api_key);

  const sectionRefs: Record<
    string,
    RefObject<HTMLDivElement | null>
  > = tourSections.reduce(
    (acc, section) => {
      acc[section.id] = useRef<HTMLDivElement | null>(null);
      return acc;
    },
    {} as Record<string, RefObject<HTMLDivElement | null>>,
  );

  // Scroll handler
  const scrollToSection = (id: string) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      <section className="relative">
        <img
          src={`${API_URL}/img/tours/${tourLocal.imageCover}`}
          className="m_window:h-[400px] l_window:h-[500px] h-[300px] w-full rounded-br-2xl object-none duration-500"
        />
        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center gap-10 font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(30,41,59,1)]">
          <h1 className="text-5xl">{tourLocal.name}</h1>
          <ul className="flex gap-10 uppercase">
            <li className="inline-flex items-center gap-1">
              <FaClock />
              {tourLocal.duration}
            </li>
            <li className="inline-flex items-center gap-1">
              <FaLocationDot />
              {tourLocal.startLocation.description}
            </li>
          </ul>
        </div>
        {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-90% to-current" /> */}
      </section>
      <nav className="m_window:flex l_window:px-6 sticky top-0 z-10 hidden place-content-between bg-white px-2 py-3">
        <ul className="m_window:gap-3 l_window:gap-4 xl_window:gap-5 flex gap-2 text-blue-500 transition-all duration-300 ease-in-out">
          {tourSections.map((section, id) => (
            <li
              key={id}
              className="transition-color rounded-3xl px-5 py-3 ease-in-out hover:bg-blue-200"
            >
              <button onClick={() => scrollToSection(section.id)}>
                {section.id}
              </button>
            </li>
          ))}
        </ul>
        <Link
          to="/checkout/:tourId"
          className="rounded-3xl bg-blue-500 px-5 py-3 text-white"
        >
          Start Planning
        </Link>
      </nav>
      <section
        className="grid scroll-mt-16 grid-cols-2"
        ref={sectionRefs["Overview"]}
      >
        <article className="s_window:p-7 m_window:p-9 m_window:pb-48 s_window:pb-40 flex flex-col gap-5 bg-gray-300 p-5 pb-36">
          <div>
            <h1 className="mb-5 text-xl font-medium">Quick Facts</h1>
            <ul className="grid gap-2" key={tourLocal.name}>
              <li className="m_window:gap-5 s_window:gap-3 grid grid-cols-[50px,1fr,1fr] items-center gap-1">
                <FaCalendar className="" />
                <span>Next Date</span>
                {convertDate(tourLocal.startDates[0])}
              </li>
              <li className="m_window:gap-5 s_window:gap-3 grid grid-cols-[50px,1fr,1fr] items-center gap-1">
                <FaArrowTrendUp />
                <span>Difficulty</span>
                {tourLocal.difficulty}
              </li>
              <li className="m_window:gap-5 s_window:gap-3 grid grid-cols-[50px,1fr,1fr] items-center gap-1">
                <BsFillPeopleFill className="" />
                <span>Max Group Size</span>
                {tourLocal.maxGroupSize} people
              </li>
            </ul>
          </div>

          <div>
            <h1 className="text-xl font-medium">This Trips Tour Guides</h1>
            <ul className="">
              {tourLocal.guides.map((guide: any) => (
                <li
                  key={guide._id}
                  className="grid max-w-96 grid-cols-3 items-center gap-3"
                >
                  <img
                    src={`${API_URL}/img/users/${guide.photo}`}
                    className="h-10 rounded-full"
                  />
                  <span className="uppercase">{guide.role}</span>
                  {guide.name}
                </li>
              ))}
            </ul>
          </div>
          {/* <div> */}
          {/* <div className="inline-flex gap-1"> */}
          {/* <AverageStarRating
                maxRating={5}
                size={24}
                color="#1e293b"
                avgRating={tourLocal.ratingsAverage}
                className={""}
              />
              <span className="font-bold">{tourLocal.ratingsAverage}</span>
              <span>/ 5</span> */}
          {/* <span>
              <span className="font-bold">&bull;</span> reviews.length reviews
              </span> */}

          {/* <span>reviews.length reviews</span> */}
          {/* </div>
          </div> */}
        </article>
        <article className="s_window:p-10 bg-mainBg xl_window:pb-52 m_window:pb-48 s_window:pb-40 flex flex-col gap-10 p-5 pb-36 text-primary duration-500">
          <h1 className="text-xl font-medium">About {tourLocal.name}</h1>
          <p>{tourLocal.description}</p>
        </article>
      </section>
      {/* xl_window:-mt-72 l_window:-mt-60 m_window:-mt-32 s_window:-mt-10 -mt-14 */}
      <section
        ref={sectionRefs["Map"]}
        className="xxl_window:-skew-y-6 m_window:skew-y-0 xl_window:-mt-48 l_window:-mt-44 m_window:-mt-40 s_window:-mt-32 static -mt-28 skew-y-6 duration-100"
      >
        <div className="l_window:grid-cols-3 grid grid-cols-2">
          {tourLocal.images.map((img, i) => (
            <img
              className={i === 2 ? "l_window:flex hidden" : ""}
              key={i}
              src={`${API_URL}/img/tours/${img}`}
            />
          ))}
        </div>
      </section>
      <section className="xxl_window:-skew-y-6 m_window:skew-y-0 static skew-y-6 duration-100">
        {/* <MapTile locations={tourLocal.locations} /> */}
        <div className="l_window:grid-cols-3 grid grid-cols-2">
          {tourLocal.images.map((img, i) => (
            <img
              className={i === 2 ? "l_window:flex hidden" : ""}
              key={i}
              src={`${API_URL}/img/tours/${img}`}
            />
          ))}
        </div>
      </section>
      {/* <article className="xl_window:-skew-y-6 l_window:-skew-y-6 m_window:skew-y-0 s_window:skew-y-6 h-52 skew-y-12 bg-red-700 duration-500"> */}
      {/* <div className="xl_window:skew-y-12 l_window:skew-y-6 m_window:-skew-y-0 s_window:-skew-y-6 h-20 -skew-y-12"> */}
      {/* <MapTile /> */}
      {/* </div> */}
      {/* </article> */}

      <article className="">{/* <StaggerTestimonials length={6} /> */}</article>
    </div>
  );
}

const tourLocal = {
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
      _id: "5c8a22c62f8fb814b56fa18b",
    },
    {
      _id: "5c8a1f4e2f8fb814b56fa185",
    },
  ],
  slug: "the-sea-explorer",
  __v: 0,
};
