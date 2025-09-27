import {
  FaArrowTrendUp,
  FaCalendar,
  FaPerson,
  FaRegStar,
} from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

import MapTile from "./../ui/MapTile";
import { getTour } from "./../api/queries";
// import type { Tour } from "./../config/schema";
import RotatingTiles from "./../ui/RotatingTiles";
import { convertDate } from "./../utils/convertDate";

// const API_URL = "http://localhost:3000";

export default function TourDetails() {
  const { tourId } = useParams();
  const { data: tour, isLoading } = getTour(tourId!);

  if (isLoading) return <div>Loading...</div>;
  if (!tour) return <div>No tour found</div>;

  return (
    <section>
      <article className="name duration location">
        <h1>{tour.name}</h1>
        <ul>
          <li>{tour.duration}</li>
          <li>{tour.startLocation.description}</li>
        </ul>
      </article>
      <article className="description and other facts">
        <div>
          <h1>Quick Facts</h1>
          <ul className="my-1 mb-3">
            <li>
              <FaCalendar />
              Next Date
              <span>{convertDate(tour.startDates[0])}</span>
            </li>
            <li>
              <FaArrowTrendUp />
              Difficulty
              <span>{tour.difficulty}</span>
            </li>
            <li>
              <FaPerson />
              Participants
              <span>{tour.maxGroupSize}</span>
            </li>
            <li>
              <FaRegStar className="pr-4" />
              Rating
              <span>{tour.ratingsAverage} / 5 </span>
            </li>
          </ul>
          <h1>This Trips Tour Guides</h1>
          <ul className="my-1 mb-3">
            {tour.guides.map((guide: any) => (
              <li key={guide.name}>
                <span className="pr-4">{guide.role}</span>
                {guide.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>About {tour.name}</h1>
          <p>{tour.description}</p>
        </div>
      </article>
      {/* <div className="imgs">
        <img src={`${API_URL}/img/tours/${tour.images[0]}`} />
        <img src={`${API_URL}/img/tours/${tour.images[1]}`} />
        <img src={`${API_URL}/img/tours/${tour.images[2]}`} /> */}
      {/* </div> */}
      <div className="map">
        <MapTile />
      </div>
      <article className="booking option">
        <Link to="/checkout/:tourId">Book Now!</Link>
      </article>
      <article className="reviews">
        <RotatingTiles />
      </article>
    </section>
  );
}
