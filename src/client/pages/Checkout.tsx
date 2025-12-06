import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCreateCheckoutSession } from "../api/queries/bookingQueries";
import PathFinderLoader from "../components/PathFinderLoader";
import BookingProgress from "../ui/booking/BookingProgress";
import BookingDetails from "../ui/booking/BookingDetails";
import { useGetTour } from "../api/queries/tourQueries";
import BookingReview from "../ui/booking/BookingReview";
import OrderSummary from "../ui/booking/OrderSummary";
import CustomerInfo from "../ui/booking/CustomerInfo";
import { useAuth } from "../api/queries/authQueries";
import type { Tour, User } from "../config/schema";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const { tourId } = useParams();
  const { data: user } = useAuth();
  const createCheckoutSession = useCreateCheckoutSession();
  const { data: tour, isLoading: tourIsLoading } = useGetTour(tourId!);

  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [checkoutMode, setCheckoutMode] = useState<"user" | "guest" | null>(
    null,
  );
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    participants: 1,
  });
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    phone: "",
  });
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
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

  useEffect(() => {
    if (user && checkoutMode === "user") {
      setCustomerInfo({
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, checkoutMode]);

  const handleCheckout = async () => {
    setError(null);

    try {
      const session = await createCheckoutSession.mutateAsync({
        tourId: tour!._id,
        participants: bookingDetails.participants,
        date: bookingDetails.date,
      });

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(
        err?.response?.data?.message || err.message || "Something went wrong",
      );
    }
  };

  if (tourIsLoading) return <PathFinderLoader />;

  return (
    <div className="mt-[70px] rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between rounded-t-2xl px-5 py-4">
        <h2 className="px-3 py-4 text-2xl font-bold text-primary">
          Complete Your Booking
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 p-6 m_window:grid-cols-3">
        <div className="space-y-6 m_window:col-span-2">
          <BookingProgress step={step} />

          {step === 1 && (
            <BookingDetails
              tour={tour as Tour}
              bookingDetails={bookingDetails}
              setBookingDetails={setBookingDetails}
              setStep={setStep}
            />
          )}
          {step === 2 && (
            <CustomerInfo
              user={user as User}
              checkoutMode={checkoutMode}
              setStep={setStep}
              billingInfo={billingInfo}
              setBillingInfo={setBillingInfo}
              setCheckoutMode={setCheckoutMode}
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />
          )}

          {step === 3 && (
            <BookingReview
              error={error}
              handleCheckout={handleCheckout}
              setStep={setStep}
              createCheckoutSession={createCheckoutSession}
              totals={totals}
              bookingDetails={bookingDetails}
              billingInfo={billingInfo}
              customerInfo={customerInfo}
            />
          )}
        </div>

        <div className="m_window:col-span-1">
          <OrderSummary
            tour={tour as Tour}
            bookingDetails={bookingDetails}
            totals={totals}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
