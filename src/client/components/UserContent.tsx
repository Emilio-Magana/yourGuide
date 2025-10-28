export default function UserContent({ selected }: { selected: string }) {
  return (
    <>
      {selected === "Profile" && (
        <div className="w-full bg-white text-primary duration-300">Profile</div>
      )}
      {selected === "Bookings" && (
        <div className="w-full bg-white text-primary duration-300">
          Bookings
        </div>
      )}
      {selected === "Reviews" && (
        <div className="w-full bg-white text-primary duration-300">Reviews</div>
      )}
      {selected === "Settings" && (
        <div className="w-full bg-white text-primary duration-300">
          Settings
        </div>
      )}
    </>
  );
}
