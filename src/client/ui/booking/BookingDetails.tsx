import { FaCalendarDay, FaUsers } from "react-icons/fa";
import type { Tour } from "../../config/schema";

interface Props {
  tour: Tour;
  bookingDetails: {
    date: string;
    participants: number;
  };
  setBookingDetails: (
    value: React.SetStateAction<{
      date: string;
      participants: number;
    }>,
  ) => void;
  setStep: (value: React.SetStateAction<number>) => void;
}

export default function BookingDetails({
  tour,
  bookingDetails,
  setBookingDetails,
  setStep,
}: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          <FaCalendarDay className="mr-2 inline h-4 w-4" />
          Select Date
        </label>
        <input
          type="date"
          value={bookingDetails.date}
          onChange={(e) =>
            setBookingDetails({ ...bookingDetails, date: e.target.value })
          }
          min={new Date().toISOString().split("T")[0]}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          <FaUsers className="mr-2 inline h-4 w-4" />
          Number of Participants
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={bookingDetails.participants}
          onChange={(e) =>
            setBookingDetails({
              ...bookingDetails,
              participants: parseInt(e.target.value) || 1,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-sm text-gray-500">
          Price per person: ${tour.price.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!bookingDetails.date}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Continue to Information
      </button>
    </div>
  );
}
