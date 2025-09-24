import { Link } from "react-router-dom";

import { convertDate } from "../utils/convertDate";
import type { Tour } from "./../config/schema";

export default function TourCard({
  name,
  imageCover,
  _id,
  difficulty,
  duration,
  summary,
  startDates,
  startLocation,
  locations,
  ratingsAverage,
  price,
  maxGroupSize,
  ratingsQuantity,
}: Tour) {
  console.log(imageCover);
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            src={`/img/tours/${imageCover}`}
            alt={name}
            className="card__picture-img"
          />
        </div>
        <Link to={`/tours/${_id}`}>
          <h3 className="heading-tertirary">
            <span>{name}</span>
          </h3>
        </Link>
      </div>
      <div className="card__details">
        <h4 className="card__sub-heading">
          {difficulty + " "}
          {duration}-day tour
        </h4>
        <p className="card__text">{summary}</p>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-map-pin"></use>
          </svg>
          <span>{startLocation.description}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-calendar"></use>
          </svg>
          <span>{convertDate(startDates[0])}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-flag"></use>
          </svg>
          <span>{locations.length} stops</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-user"></use>
          </svg>
          <span>{maxGroupSize} people</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">${price}</span>
          <span className="card__footer-text"> per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{ratingsAverage}</span>
          <span className="card__footer-text"> rating ({ratingsQuantity})</span>
        </p>
        <Link to={`/tours/${_id}`} className="btn btn--green btn--small">
          Details
        </Link>
      </div>
    </div>
  );
}
