import { FaMapPin } from "react-icons/fa";
import type { Tour } from "../../config/schema";

interface Props {
  tour: Tour;
  bookingDetails: {
    date: string;
    participants: number;
  };
  totals: {
    subtotal: number;
    tax: number;
    serviceFee: number;
    total: number;
  };
}
export default function OrderSummary({ tour, bookingDetails, totals }: Props) {
  return (
    <div className="sticky top-24 space-y-6 rounded-xl bg-gray-50 p-6">
      <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>

      <div className="space-y-3">
        <img
          src={
            tour.imageCover
              ? `/img/tours/${tour.imageCover}`
              : "/placeholder-tour.jpg"
          }
          alt={tour.name}
          className="h-40 w-full rounded-lg object-cover"
        />
        <h4 className="font-semibold text-gray-900">{tour.name}</h4>
        <p className="flex items-center gap-1 text-sm text-gray-600">
          <FaMapPin className="h-4 w-4" />
          {tour.startLocation.description}
        </p>
        <p className="text-sm text-gray-600">Duration: {tour.duration} days</p>
      </div>

      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Price per person</span>
          <span className="font-medium">${tour.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Participants</span>
          <span className="font-medium">× {bookingDetails.participants}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium">${totals.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Service Fee</span>
          <span className="font-medium">${totals.serviceFee.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-blue-600">
            ${totals.total.toFixed(2)}
          </span>
        </div>
      </div>

      {bookingDetails.date && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="mb-1 text-xs font-medium text-blue-900">
            Selected Date
          </p>
          <p className="text-sm text-blue-700">
            {new Date(bookingDetails.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
