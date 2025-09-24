// import NavigationBar from "../ui/Navigation"
// import imageCover from "/img/tours/tour-1-1.jpg";

export default function Overview() {
  // const img = "/public/img/tours/tour-1-1.jpg";
  const imageCover = "tour-1-cover.jpg";
  return (
    <div>
      <img src={`/img/tours/${imageCover}`} alt="Tour" />
    </div>
  );
}
