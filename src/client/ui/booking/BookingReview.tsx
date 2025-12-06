import type { UseMutationResult } from "@tanstack/react-query";
import { BsX } from "react-icons/bs";
import { FaCreditCard, FaLock } from "react-icons/fa";

interface Props {
  error: string | null;
  handleCheckout: () => Promise<void>;
  setStep: (value: React.SetStateAction<number>) => void;
  createCheckoutSession: UseMutationResult<
    any,
    Error,
    {
      tourId: string;
      participants: number;
      date: string;
    },
    unknown
  >;
  totals: {
    subtotal: number;
    tax: number;
    serviceFee: number;
    total: number;
  };
  bookingDetails: {
    date: string;
    participants: number;
  };
  billingInfo: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
  };
  customerInfo: {
    email: string;
    phone: string;
  };
}

export default function BookingReview({
  error,
  handleCheckout,
  setStep,
  createCheckoutSession,
  totals,
  bookingDetails,
  billingInfo,
  customerInfo,
}: Props) {
  return (
    <div className="space-y-6 text-sky-950">
      <h3 className="text-xl font-semibold text-primary">
        Review Your Booking
      </h3>

      <div className="space-y-4 rounded-lg bg-gray-50 p-6">
        <div>
          <h4 className="mb-2 font-semibold">Booking Details</h4>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(bookingDetails.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Participants:</span>
              <span className="font-medium">{bookingDetails.participants}</span>
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="mb-2 font-semibold">Customer Information</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>{customerInfo.email}</p>
            <p>{customerInfo.phone}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="mb-2 font-semibold">Billing Address</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              {billingInfo.firstName} {billingInfo.lastName}
            </p>
            <p>{billingInfo.address}</p>
            <p>
              {billingInfo.city}, {billingInfo.country} {billingInfo.zipCode}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <FaLock className="mt-0.5 h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm font-medium text-blue-900">
            Secure Payment with Stripe
          </p>
          <p className="mt-1 text-xs text-blue-700">
            You will be redirected to Stripe's secure checkout page to complete
            your payment.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <BsX className="mt-0.5 h-5 w-5 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => setStep(2)}
          disabled={createCheckoutSession.isPending}
          className="w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-primary transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleCheckout}
          disabled={createCheckoutSession.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <FaCreditCard className="h-5 w-5" />
          {createCheckoutSession.isPending
            ? "Redirecting to Stripe..."
            : `Proceed to Payment - $${totals.total.toFixed(2)}`}
        </button>
      </div>

      <p className="text-center text-xs text-gray-500">
        By proceeding, you agree to our terms and conditions
      </p>
    </div>
  );
}
