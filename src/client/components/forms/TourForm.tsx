import React, { useState } from "react";

import { IoMdTrendingUp } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { BsSave, BsX } from "react-icons/bs";
import {
  FaImages,
  FaUsers,
  FaCalendarDay,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { useGetTour } from "../../api/queries/tourQueries";

interface TourFormProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  // onSuccess?: () => void;
  className: string;
  tourId?: string;
}

export default function TourForm({
  setIsEditing,
  // onSuccess,
  isEditing,
  className,
  tourId,
}: TourFormProps) {
  const { data: tour } = useGetTour(tourId!);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [imageCoverPreview, setImageCoverPreview] = useState<string | null>(
    null,
  );
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imageCoverFile, setImageCoverFile] = useState<File | null>(null);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    maxGroupSize: "",
    difficulty: "medium",
    price: "",
    summary: "",
    description: "",
    startDates: [""],
    startLocation: {
      description: "",
      address: "",
    },
    locations: [
      {
        description: "",
        day: "",
      },
    ],
    guides: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as any),
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: "startDates" | "guides",
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleLocationChange = (
    index: number,
    field: "description" | "day",
    value: string,
  ) => {
    const newLocations = [...formData.locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setFormData((prev) => ({ ...prev, locations: newLocations }));
  };

  const addArrayField = (field: "startDates" | "guides" | "locations") => {
    if (field === "locations") {
      setFormData((prev) => ({
        ...prev,
        locations: [...prev.locations, { description: "", day: "" }],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
    }
  };

  const removeArrayField = (
    index: number,
    field: "startDates" | "guides" | "locations",
  ) => {
    if (field === "locations") {
      setFormData((prev) => ({
        ...prev,
        locations: prev.locations.filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const handleImageCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage({ type: "error", text: "Please upload only images" });
        return;
      }
      setImageCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImageCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      setMessage({ type: "error", text: "Maximum 3 images allowed" });
      return;
    }

    const validFiles = files.filter((f) => f.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      setMessage({ type: "error", text: "Please upload only images" });
      return;
    }

    setImagesFiles(validFiles);
    const previews: string[] = [];
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === validFiles.length) {
          setImagesPreview(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("maxGroupSize", formData.maxGroupSize);
      formDataToSend.append("difficulty", formData.difficulty);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("summary", formData.summary);
      formDataToSend.append("description", formData.description);

      if (imageCoverFile) {
        formDataToSend.append("imageCover", imageCoverFile);
      }
      imagesFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      formDataToSend.append(
        "startDates",
        JSON.stringify(formData.startDates.filter((d) => d)),
      );
      formDataToSend.append(
        "startLocation",
        JSON.stringify(formData.startLocation),
      );
      formDataToSend.append(
        "locations",
        JSON.stringify(formData.locations.filter((l) => l.description)),
      );
      formDataToSend.append(
        "guides",
        JSON.stringify(formData.guides.filter((g) => g)),
      );

      const url = isEditing ? `/api/tours/${tourId}` : "/api/tours";
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        credentials: "include",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save tour");
      }

      setMessage({
        type: "success",
        text: `Tour ${isEditing ? "updated" : "created"} successfully!`,
      });

      if (!isEditing) {
        // Reset form for new tour creation
        setFormData({
          name: "",
          duration: "",
          maxGroupSize: "",
          difficulty: "medium",
          price: "",
          summary: "",
          description: "",
          startDates: [""],
          startLocation: { description: "", address: "" },
          locations: [{ description: "", day: "" }],
          guides: [""],
        });
        setImageCoverFile(null);
        setImagesFiles([]);
        setImageCoverPreview(null);
        setImagesPreview([]);
      }

      // onSuccess?.();
    } catch (err: any) {
      setMessage({
        type: "error",
        text:
          err.message || `Failed to ${isEditing ? "update" : "create"} tour`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className={className}>
      <h1 className="bg-gradient-to-r from-headerBegBg to-headerEndBg px-6 py-5 text-xl font-bold text-white">
        {tourId ? `Edit ${tour?.name} Tour` : "Create New Tour"}
      </h1>

      <div className="px-6 py-5">
        {message.text && (
          <div
            className={`mb-6 rounded-lg p-4 ${
              message.type === "success"
                ? "border border-green-200 bg-green-50 text-green-800"
                : "border border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div className="md:grid-cols-2 grid grid-cols-1 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tour Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input"
                placeholder={tour ? tour.name : "The Forest Hiker"}
              />
            </div>
            <div className="flex justify-stretch gap-5">
              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <FaClock size={16} className="mr-2 inline" />
                  Duration (days) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="input"
                  placeholder={tour ? `${tour.duration}` : "5"}
                />
              </div>

              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <FaUsers size={16} className="mr-2 inline" />
                  Max Group Size *
                </label>
                <input
                  type="number"
                  name="maxGroupSize"
                  value={formData.maxGroupSize}
                  onChange={handleInputChange}
                  required
                  className="input"
                  placeholder={tour ? `${tour.maxGroupSize}` : "25"}
                />
              </div>
            </div>

            <div className="flex justify-stretch gap-5">
              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <IoMdTrendingUp size={16} className="mr-2 inline" />
                  Difficulty *
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="input"
                  defaultValue={tour ? `${tour.difficulty}` : "medium"}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="difficult">Difficult</option>
                </select>
              </div>

              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <FaDollarSign size={16} className="mr-2 inline" />
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="input"
                  placeholder={tour ? `${tour.price}` : "497"}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Summary *
            </label>
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              required
              className="input"
              placeholder={tour ? `${tour.summary}` : "Brief tour summary"}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="input"
              placeholder={
                tour ? `${tour.description}` : "Detailed tour description"
              }
            />
          </div>

          <div className="flex justify-stretch gap-5">
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <FaImages size={16} className="mr-2 inline" />
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageCoverChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              />
              {imageCoverPreview && (
                <img
                  src={imageCoverPreview}
                  alt="Cover"
                  className="mt-3 h-40 w-full rounded-lg object-cover"
                />
              )}
            </div>

            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tour Images (Max 3)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              />
              {imagesPreview.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {imagesPreview.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Tour ${idx + 1}`}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Start Location
            </h3>
            <div className="flex justify-stretch gap-5">
              <input
                type="text"
                value={formData.startLocation.description}
                onChange={(e) =>
                  handleNestedChange(
                    "startLocation",
                    "description",
                    e.target.value,
                  )
                }
                placeholder={
                  tour ? `${tour.startLocation.description}` : "Miami, USA"
                }
                className="input"
              />
              <input
                type="text"
                value={formData.startLocation.address}
                onChange={(e) =>
                  handleNestedChange("startLocation", "address", e.target.value)
                }
                placeholder={
                  tour
                    ? `${tour.startLocation.address}`
                    : "301 Biscayne Blvd, Miami, FL 33132, USA"
                }
                className="input"
              />
            </div>
          </div>

          <div className="border-t pt-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Tour Locations
              </h3>
              <button
                type="button"
                onClick={() => addArrayField("locations")}
                className="add-button"
              >
                <FaCirclePlus size={16} />
                Add Location
              </button>
            </div>
            {formData.locations.map((location, idx) => (
              <div key={idx} className="mb-3 flex gap-3">
                <input
                  type="text"
                  value={location.description}
                  onChange={(e) =>
                    handleLocationChange(idx, "description", e.target.value)
                  }
                  placeholder={
                    tour
                      ? `${tour.locations[0].description}`
                      : "Lummus Park Beach"
                  }
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  value={location.day}
                  onChange={(e) =>
                    handleLocationChange(idx, "day", e.target.value)
                  }
                  placeholder={tour ? `${tour.locations[0].day}` : "1"}
                  className="w-24 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                />
                {formData.locations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField(idx, "locations")}
                    className="rounded-lg p-3 text-red-600 hover:bg-red-50"
                  >
                    <BsX size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="items-center text-sm font-semibold text-gray-800">
                <FaCalendarDay size={16} className="mr-2 inline" />
                Start Dates
              </h3>
              <button
                type="button"
                onClick={() => addArrayField("startDates")}
                className="add-button"
              >
                <FaCirclePlus size={16} />
                Add Date
              </button>
            </div>
            {formData.startDates.map((date, idx) => (
              <div key={idx} className="mb-3 flex gap-3">
                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    handleArrayChange(idx, e.target.value, "startDates")
                  }
                  className="input"
                />
                {formData.startDates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField(idx, "startDates")}
                    className="rounded-lg p-3 text-red-600 hover:bg-red-50"
                  >
                    <BsX size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Guide IDs</h3>
              <button
                type="button"
                onClick={() => addArrayField("guides")}
                className="add-button"
              >
                <FaCirclePlus size={16} />
                Add Guide
              </button>
            </div>
            {formData.guides.map((guide, idx) => (
              <div key={idx} className="mb-3 flex gap-3">
                <input
                  type="text"
                  value={guide}
                  onChange={(e) =>
                    handleArrayChange(idx, e.target.value, "guides")
                  }
                  placeholder="Guide User ID"
                  className="input"
                />
                {formData.guides.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField(idx, "guides")}
                    className="rounded-lg p-3 text-red-600 hover:bg-red-50"
                  >
                    <BsX size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="form-submit-button w-full"
            >
              <BsSave size={16} />
              {loading
                ? "Saving..."
                : isEditing
                  ? "Update Tour"
                  : "Create Tour"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="form-cancel-button w-full"
            >
              <BsX size={20} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
