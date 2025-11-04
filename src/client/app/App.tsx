import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./../pages/Login";
import Tours from "./../pages/Tours";
import Privacy from "../pages/Privacy";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import Careers from "../pages/Careers";
import NotFound from "./../pages/NotFound";
import Overview from "./../pages/Overview";
import Checkout from "./../pages/Checkout";
import TourDetails from "./../pages/TourDetails";
import NewTourForm from "./../pages/NewTourForm";

import AppLayout from "./../ui/AppLayout";
import TourForm from "./../components/TourForm";
import { DarkModeProvider } from "./../context/DarkModeContext";
import ProtectedRoutes from "./../authentication/ProtectedRoutes";
import UserOverview from "../pages/UserOverview";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const lastUpdated = "October 2025";

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
              <Route
                path="/privacy"
                element={<Privacy lastUpdated={lastUpdated} />}
              />
              <Route
                path="/contact"
                element={<Contact lastUpdated={lastUpdated} />}
              />
              <Route
                path="/aboutus"
                element={<AboutUs lastUpdated={lastUpdated} />}
              />
              <Route
                path="/careers"
                element={<Careers lastUpdated={lastUpdated} />}
              />

              {/* Protected (any authenticated user) */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/:userId/dashboard" element={<UserOverview />} />
                <Route path="/:userId/bookings" element={<UserOverview />} />
                <Route path="/:userId/reviews" element={<UserOverview />} />
                <Route path="/:userId/settings" element={<UserOverview />} />
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

                {/* <Route path="/bookings" element={<Bookings />} /> */}
                {/* <Route
                  path="/bookings/:bookingId"
                  element={<BookingDetails />}
                /> */}
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>

        {/* <Toaster
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
        /> */}
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
