import { loadStripe } from "@stripe/stripe-js";
import { BsX } from "react-icons/bs";
import { useState } from "react";
import {
  FaUsers,
  FaCalendarDay,
  FaMapPin,
  FaLock,
  FaCheck,
  FaChevronRight,
  FaCreditCard,
} from "react-icons/fa";

import { useGetTour } from "../api/queries/tourQueries";
import { useParams } from "react-router-dom";
import PathFinderLoader from "../components/PathFinderLoader";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// participants is not updating total correctly

function Checkout() {
  const { tourId } = useParams();
  const { data: tour, isLoading: tourIsLoading } = useGetTour(tourId!);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    participants: 1,
  });

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const calculateTotal = () => {
    const subtotal = (tour?.price || 1000) * bookingDetails.participants;
    const tax = subtotal * 0.1;
    const serviceFee = 5.99;
    return {
      subtotal,
      tax,
      serviceFee,
      total: subtotal + tax + serviceFee,
    };
  };

  const totals = calculateTotal();

  console.log(
    "pariticpants:",
    bookingDetails.participants,
    "\ntotal:",
    totals.subtotal,
  );

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get Stripe checkout session from your backend
      // const response = await fetch(
      //   `/api/v1/bookings/checkout-session/${tour._id}`,
      //   {
      const response = await fetch(
        `/api/v1/bookings/checkout-session/${tour!._id}?participants=${bookingDetails.participants}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create checkout session",
        );
      }

      const data = await response.json();
      const sessionId = data.checkoutSession.id;

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };
  if (tourIsLoading) return <PathFinderLoader />;

  return (
    <div className="my-8 flex flex-col items-center justify-center rounded-2xl p-4 shadow-2xl">
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-secondary px-6 py-4">
        <h2 className="text-2xl font-bold text-header">
          Complete Your Booking
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 p-6 l_window:grid-cols-3">
        <div className="space-y-6 l_window:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                  step >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-secondary"
                }`}
              >
                {step > 1 ? <FaCheck size={24} /> : "1"}
              </div>
              <span className="text-sm font-medium text-header">Details</span>
            </div>
            <FaChevronRight size={20} className="text-gray-400" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                  step >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-secondary"
                }`}
              >
                {step > 2 ? <FaCheck size={24} /> : "2"}
              </div>
              <span className="text-sm font-medium text-header">
                Billing Info
              </span>
            </div>
            <FaChevronRight size={20} className="text-gray-400" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                  step >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-secondary"
                }`}
              >
                3
              </div>
              <span className="text-sm font-medium text-header">Review</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-header">
                Booking Details
              </h3>

              <div>
                <label className="mb-2 block text-sm font-medium text-tertiary">
                  <FaCalendarDay size={16} className="mr-2 inline" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={bookingDetails.date}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      date: e.target.value,
                    })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-tertiary">
                  <FaUsers size={16} className="mr-2 inline" />
                  Number of Participants
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={bookingDetails.participants}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      participants: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-2 text-sm text-secondary">
                  Price per person: ${tour?.price.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={
                  !bookingDetails.date && bookingDetails.participants > 20
                }
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Continue to Billing Info
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Billing Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-tertiary">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={billingInfo.firstName}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-tertiary">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={billingInfo.lastName}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-tertiary">
                  Email
                </label>
                <input
                  type="email"
                  value={billingInfo.email}
                  onChange={(e) =>
                    setBillingInfo({ ...billingInfo, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-tertiary">
                  Phone
                </label>
                <input
                  type="tel"
                  value={billingInfo.phone}
                  onChange={(e) =>
                    setBillingInfo({ ...billingInfo, phone: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-tertiary">
                  Address
                </label>
                <input
                  type="text"
                  value={billingInfo.address}
                  onChange={(e) =>
                    setBillingInfo({
                      ...billingInfo,
                      address: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-tertiary">
                    City
                  </label>
                  <input
                    type="text"
                    value={billingInfo.city}
                    onChange={(e) =>
                      setBillingInfo({ ...billingInfo, city: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-tertiary">
                    Country
                  </label>
                  <input
                    type="text"
                    value={billingInfo.country}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        country: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="USA"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-tertiary">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={billingInfo.zipCode}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        zipCode: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="10001"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold transition-colors hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!billingInfo.firstName || !billingInfo.email}
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Review Your Booking
              </h3>

              <div className="space-y-4 rounded-lg bg-gray-50 p-6">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Booking Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {new Date(bookingDetails.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-medium">
                        {bookingDetails.participants}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Billing Information
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      {billingInfo.firstName} {billingInfo.lastName}
                    </p>
                    <p>{billingInfo.email}</p>
                    <p>{billingInfo.phone}</p>
                    <p>{billingInfo.address}</p>
                    <p>
                      {billingInfo.city}, {billingInfo.country}{" "}
                      {billingInfo.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <FaLock size={20} className="mt-0.5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Secure Payment with Stripe
                  </p>
                  <p className="mt-1 text-xs text-blue-700">
                    You will be redirected to Stripe's secure checkout page to
                    complete your payment.
                  </p>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                  <BsX size={20} className="mt-0.5 text-red-600" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  <FaCreditCard size={20} />
                  {loading
                    ? "Redirecting to Stripe..."
                    : `Proceed to Payment - $${totals.total.toFixed(2)}`}
                </button>
              </div>

              <p className="text-center text-xs text-secondary">
                By proceeding, you agree to our terms and conditions
              </p>
            </div>
          )}
        </div>

        <div className="l_window:col-span-1">
          <div className="sticky top-24 space-y-6 rounded-xl bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h3>

            <div className="space-y-3">
              <img
                src={
                  tour?.imageCover
                    ? `/img/tours/${tour.imageCover}`
                    : "/placeholder-tour.jpg"
                }
                className="h-40 w-full rounded-lg object-cover"
              />
              <h4 className="font-semibold text-gray-900">{tour?.name}</h4>
              <p className="flex items-center gap-1 text-sm text-gray-600">
                <FaMapPin size={16} />
                {tour?.startLocation.description}
              </p>
              <p className="text-sm text-gray-600">
                Duration: {tour?.duration} days
              </p>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per person</span>
                <span className="font-medium">${tour?.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Participants</span>
                <span className="font-medium">
                  × {bookingDetails.participants}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ${totals.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium">
                  ${totals.serviceFee.toFixed(2)}
                </span>
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
        </div>
      </div>
    </div>
  );
}

export default Checkout;
