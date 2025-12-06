import { FaCheck, FaChevronRight } from "react-icons/fa";

interface Props {
  step: number;
}

export default function BookingProgress({ step }: Props) {
  return (
    <div className="mb-8 flex items-center justify-between gap-x-4 place-self-center text-primary">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
            step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-sky-950"
          }`}
        >
          {step > 1 ? <FaCheck size={24} /> : "1"}
        </div>
        <span className="text-sm font-medium">Details</span>
      </div>
      <FaChevronRight size={24} className="text-gray-400" />
      <div className="flex items-center gap-2">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
            step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-sky-950"
          }`}
        >
          {step > 2 ? <FaCheck size={24} /> : "2"}
        </div>
        <span className="text-sm font-medium">Information</span>
      </div>
      <FaChevronRight size={24} className="text-gray-400" />
      <div className="flex items-center gap-2">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
            step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-sky-950"
          }`}
        >
          3
        </div>
        <span className="text-sm font-medium">Review</span>
      </div>
    </div>
  );
}
