import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="bg-red-500 text-white p-10 text-2xl">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
