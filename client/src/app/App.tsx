import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./../pages/Login";
import Tours from "./../pages/Tours";
import Bookings from "./../pages/Bookings";
import NotFound from "./../pages/NotFound";
import Overview from "./../pages/Overview";
import TourDetails from "./../pages/TourDetails";
import ProtectedRoutes from "./../authentication/ProtectedRoutes";
import Checkout from "./../pages/Checkout";
import Dashboard from "./../pages/Dashboard";
import UserProfile from "./../pages/UserProfile";
import UserBookings from "./../pages/UserBookings";
import UserReviews from "./../pages/UserReviews";
import NewTourForm from "./../pages/NewTourForm";
import TourForm from "./../components/TourForm";
import BookingDetails from "./../pages/BookingDetails";
import AppLayout from "./../ui/AppLayout";
import { DarkModeProvider } from "./../context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Overview />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:tourId" element={<TourDetails />} />

              {/* Protected (any authenticated user) */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard/:userId" element={<Dashboard />} />
                <Route path="/profile/:userId" element={<UserProfile />} />
                <Route path="/bookings/:userId" element={<UserBookings />} />
                <Route path="/reviews/:userId" element={<UserReviews />} />

                <Route path="/checkout/:tourId" element={<Checkout />} />
              </Route>

              {/* Role-based protection */}
              <Route
                element={<ProtectedRoutes roles={["admin", "lead-guide"]} />}
              >
                <Route
                  path="/tours/create-new-tour"
                  element={<NewTourForm />}
                />
                <Route path="/update/tours/:tourId" element={<TourForm />} />

                <Route path="/bookings" element={<Bookings />} />
                <Route
                  path="/bookings/:bookingId"
                  element={<BookingDetails />}
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              // backgroundColor: "var(--color-grey-0)",
              // color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
