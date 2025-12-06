import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserOverview from "../pages/UserOverview";
import TourDetails from "../pages/TourDetails";
import Overview from "../pages/Overview";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";
import AboutUs from "../pages/AboutUs";
import Careers from "../pages/Careers";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Tours from "../pages/Tours";
import Login from "../pages/Login";

import ProtectedRoutes from "../authentication/ProtectedRoutes";
import { DarkModeProvider } from "../context/DarkModeContext";
import AppLayout from "../ui/AppLayout";
import Signup from "../pages/Signup";
import PostTourReview from "../pages/PostTourReview";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const lastUpdated = "November 2025";

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Overview />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:tourId" element={<TourDetails />} />
              <Route path="/tours/:tourId/checkout" element={<Checkout />} />
              <Route
                path="/tours/:tourId/userReview"
                element={<PostTourReview />}
              />
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
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/users/:userId/dashboard"
                  element={<UserOverview />}
                />
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
