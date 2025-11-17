import { BsCamera, BsSave, BsX } from "react-icons/bs";
import { useEffect, useState } from "react";

import { useUpdateMe } from "../api/queries/userQueries";
import { useAuth } from "../api/queries/authQueries";

const api_url = import.meta.env.VITE_API_URL;
const defaultPFP = "default.jpg";

interface profileFormProps {
  pfp: string;
  userName: string;
  userEmail: string;
}
export default function ProfileForm({
  pfp,
  userName,
  userEmail,
}: profileFormProps) {
  const { data: user } = useAuth();
  const updateMeMutation = useUpdateMe();
  const [isEditing, setIsEditing] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pfp: "",
  });
  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pfp: "",
  });
  useEffect(() => {
    if (user) {
      const userData = {
        pfp: pfp || "",
        name: userName || "",
        email: userEmail || "",
        phone: user.phone || "",
        address: user.address || "",
      };
      setFormData(userData);
      setOriginalData(userData);
    }
  }, [user]);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    await updateMeMutation.mutateAsync({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      photo: photoFile || undefined,
    });
    setIsEditing(false);
    setPhotoFile(null);
  };
  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setPhotoFile(null);
  };

  const handleOnFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    el: string,
  ) => {
    if (isEditing) {
      e.target.value = "";
      setFormData((prev) => ({ ...prev, [el]: "" }));
    }
  };
  const photoUrl = formData.pfp ? `/img/users/${formData.pfp}` : null;

  return (
    <form action="" className="rounded-2xl bg-white p-6">
      <div className="flex flex-col gap-5 duration-300 m_window:flex-row">
        <div className="flex flex-col place-items-start gap-3 duration-300 xs_window:place-items-center">
          <div className="relative w-fit">
            {photoUrl ? (
              <div className="h-52 w-52 overflow-hidden rounded border border-white object-none">
                <img src={photoUrl} />
              </div>
            ) : (
              <div className="h-52 w-52 overflow-hidden rounded border border-white object-none">
                <img src={`${api_url}/img/users/${defaultPFP}`} />
              </div>
            )}
            {isEditing && (
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-indigo-500 p-2 shadow-lg hover:bg-indigo-700"
              >
                <BsCamera size={20} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  id="photo-upload"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="h-10 w-52 rounded-lg bg-blue-600 px-6 text-sm font-medium text-white shadow-md hover:bg-blue-700 hover:shadow-lg"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-y-1 text-sm font-medium">
              <button
                onClick={handleSubmit}
                disabled={updateMeMutation.isPending}
                className="flex h-10 w-52 items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-white shadow-md hover:bg-green-700 hover:shadow-lg"
              >
                <BsSave size={20} />
                {updateMeMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancel}
                disabled={updateMeMutation.isPending}
                className="flex h-10 w-52 items-center justify-center gap-2 rounded-lg bg-gray-500 px-6 py-2 text-white shadow-md hover:bg-gray-600 hover:shadow-lg"
              >
                <BsX size={20} />
                Cancel
              </button>
            </div>
          )}
        </div>
        {/* this one below */}
        <div className="flex w-full flex-col justify-stretch gap-5">
          <div className="flex w-full flex-col justify-stretch gap-5 l_window:flex-row">
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <input
                required
                type="text"
                name="name"
                disabled={!isEditing}
                value={formData.name}
                onChange={handleInputChange}
                onFocus={(e) => handleOnFocus(e, "name")}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                disabled={!isEditing}
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={(e) => handleOnFocus(e, "phone")}
                placeholder="+1 (555) 123-4567"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              disabled={!isEditing}
              value={formData.email}
              onChange={handleInputChange}
              onFocus={(e) => handleOnFocus(e, "email")}
              placeholder="your.email@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
          <div className="hidden l_window:block">
            <label className="mb-2 block text-sm font-medium">Address</label>
            <textarea
              rows={1}
              name="address"
              disabled={!isEditing}
              value={formData.address}
              onChange={handleInputChange}
              onFocus={(e) => handleOnFocus(e, "address")}
              placeholder="Enter your full address"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
        </div>
      </div>
      <div className="l_window:hidden">
        <label className="mb-2 block text-sm font-medium">Address</label>
        <textarea
          rows={1}
          name="address"
          disabled={!isEditing}
          value={formData.address}
          onChange={handleInputChange}
          onFocus={(e) => handleOnFocus(e, "email")}
          placeholder="Enter your full address"
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
        />
      </div>
    </form>
  );
}
