import { useEffect, useState, type RefObject } from "react";
import { useAuth, useUpdateMe } from "../api/queries";
import { BsCamera, BsSave, BsX } from "react-icons/bs";

const api_url = import.meta.env.VITE_API_URL;
const defaultPFP = "default.jpg";

interface userProfileProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  id: string;
  pfp: string;
  userName: string;
  userEmail: string;
  className: string;
}

export default function Profile({
  id,
  pfp,
  userName,
  userEmail,
  className,
  sectionRef,
}: userProfileProps) {
  const { data: user } = useAuth();
  const updateMeMutation = useUpdateMe();
  const [isEditing, setIsEditing] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  // const [formData, setFormData] = useState({
  //   name: userName,
  //   email: userEmail,
  //   phone: user.phone || "",
  //   address: user.address || "",
  //   pfp: pfp || user.photo || "",
  // });
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
    <article id={id} ref={sectionRef} className={className}>
      <h1 className="font-semibold duration-300">Account Management</h1>
      {/* add a toaster pop upfor this */}
      {/* {message.text && (
        <div
          className={`mb-6 rounded-lg p-4 ${
            message.type === "success"
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )} */}

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
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
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
                type="text"
                name="name"
                value={formData.name}
                onFocus={(e) => handleOnFocus(e, "name")}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 disabled:bg-gray-50 disabled:text-gray-600"
                placeholder="Enter your full name"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={(e) => handleOnFocus(e, "phone")}
                disabled={!isEditing}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 disabled:bg-gray-50 disabled:text-gray-600"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={(e) => handleOnFocus(e, "email")}
              disabled={!isEditing}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 disabled:bg-gray-50 disabled:text-gray-600"
              placeholder="your.email@example.com"
            />
          </div>
          <div className="hidden l_window:block">
            <label className="mb-2 block text-sm font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={1}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 disabled:bg-gray-50 disabled:text-gray-600"
              placeholder="Enter your full address"
            />
          </div>
        </div>
      </div>
      <div className="l_window:hidden">
        <label className="mb-2 block text-sm font-medium">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          disabled={!isEditing}
          onFocus={(e) => handleOnFocus(e, "email")}
          rows={1}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 disabled:bg-gray-50 disabled:text-gray-600"
          placeholder="Enter your full address"
        />
      </div>
    </article>
  );
}
