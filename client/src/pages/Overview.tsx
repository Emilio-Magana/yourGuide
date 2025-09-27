import img from "./../../../public/img/tours/tour-1-3.jpg";
export default function Overview() {
  // const imageCover = "tour-1-1.jpg";
  return (
    <div>
      {/* ✅ Note: no ./ at the beginning */}
      <img src={img} alt="Tour" />
      <img src={img} alt="Tour" />
      <img src={img} alt="Tour" />
      <img src={img} alt="Tour" />
      <img src={img} alt="Tour" />
      <img src={img} alt="Tour" />
    </div>
  );
}
