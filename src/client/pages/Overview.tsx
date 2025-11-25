import { Link } from "react-router-dom";
import logo from "/img/logo-green-small.png";
import CardMiniLink from "../ui/CardMiniLink";

const cardInfo = [
  { label: "The Outdoors", imageCover: "tour-1-2.jpg" },
  { label: "Astronomy", imageCover: "tour-8-3.jpg" },
  { label: "City", imageCover: "tour-4-1.jpg" },
  { label: "Culture", imageCover: "tour-7-cover.jpg" },
];
export default function Overview() {
  return (
    <section className="mt-6 flex flex-col gap-16 text-primary">
      <div className="h-40 pt-16">
        <h1 className="rounded pt-9 text-center text-5xl font-semibold">
          Where to?
        </h1>
      </div>
      {/* h-16 */}
      <div className="place-items-center justify-center">
        {/* <div className="flex place-items-center rounded-full p-2 shadow-[0_10px_15px_-3px_rgb(0,0,0/0.1)]"> */}
        <div className="bg-mainShadeBg flex place-items-center gap-2 rounded-full p-2 shadow-2xl">
          <h2 className="gap-2 rounded-full text-center text-xl text-primary">
            Check out our Tours
          </h2>
          <Link
            to="/tours"
            className="group relative rounded-3xl bg-sky-400 px-[14px] py-[12px] font-medium text-white duration-300 hover:px-6 hover:py-2"
          >
            here!
            {/* {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`absolute -left-[${8 * i}px] -top-[${8 * i}px] -z-10 hidden rounded-full py-[${24 + 8 * i}px] pl-[${38 + 8 * i}px] pr-[${39.5 + 8 * i}px] opacity-0 ring-8 ring-sky-500 transition-opacity delay-100 duration-300 group-hover:block group-hover:opacity-100`}
            />
          ))} */}
            {/* <div className="absolute -left-[0px] -top-[0px] -z-10 hidden rounded-full py-[24px] pl-[38px] pr-[39.5px] opacity-0 ring-[20px] ring-sky-500 transition-opacity delay-100 duration-300 group-hover:block group-hover:opacity-100" />
          <div className="absolute -left-[20px] -top-[20px] -z-10 hidden rounded-full py-[44px] pl-[58px] pr-[59.5px] opacity-0 ring-[22px] ring-sky-600 transition-opacity delay-100 duration-300 group-hover:block group-hover:opacity-100" />
          <div className="absolute -left-[42px] -top-[42px] -z-10 hidden rounded-full py-[66px] pl-[80px] pr-[81.5px] opacity-0 ring-[24px] ring-sky-800 transition-opacity delay-100 duration-300 group-hover:block group-hover:opacity-100" />
          <div className="absolute -left-[66px] -top-[66px] -z-10 hidden rounded-full py-[90px] pl-[104px] pr-[105.5px] opacity-0 ring-[26px] ring-sky-950 transition-opacity delay-100 duration-300 group-hover:block group-hover:opacity-100" /> */}
          </Link>
        </div>
      </div>

      <div className="mx-10 grid grid-cols-1 shadow-2xl duration-300 m_window:h-[480px] m_window:grid-cols-[1fr_400px] l_window:grid-cols-[1fr_500px] xl_window:grid-cols-[1fr_600px]">
        <img
          src="/img/tours/tour-1-1.jpg"
          alt=""
          className="h-[480px] w-full object-none max-m_window:rounded-t-xl m_window:rounded-l-xl"
        />

        <div className="flex flex-col gap-4 bg-sky-400 p-8 text-sky-950 max-m_window:rounded-b-xl m_window:rounded-r-xl">
          <div className="flex place-items-baseline gap-3 text-3xl font-semibold">
            <img
              src={logo}
              className="h-[30px] drop-shadow-[0px_1.3px_2px_rgb(8,47,73)]"
            />
            <h1 className="text-3xl font-semibold duration-300 xl_window:text-4xl">
              Rewards
            </h1>
          </div>
          <h2 className="text-5xl font-semibold duration-300 xl_window:text-6xl">
            Introducing
            <br /> New Member
            <br /> Rewards
          </h2>
          <p className="text-lg font-medium duration-300 xl_window:text-xl">
            Become a New Member and take 5% off of your next experience! <br />
            Join now while rewards still last!
          </p>

          <Link
            to="/login"
            className="w-fit rounded-3xl bg-sky-950 px-3 py-3 font-medium text-white duration-300 hover:-translate-y-1 hover:drop-shadow-[0_4px_1.2px_rgb(255,255,255)]"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="mx-12">
        <h1 className="text-xl font-semibold">Find things to do by interest</h1>
        <h2 className="font-light">Whatever you're into, we&#39;ve got it</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 duration-300 l_window:grid-cols-4">
          {cardInfo.map((card, i) => (
            <CardMiniLink
              key={i}
              imageCover={card.imageCover}
              label={card.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
