import { FaUser } from "react-icons/fa";
import type { User } from "../../config/schema";

interface Props {
  user: User;
  checkoutMode: "user" | "guest" | null;
  setStep: (value: React.SetStateAction<number>) => void;
  billingInfo: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
  };
  setBillingInfo: (
    value: React.SetStateAction<{
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      country: string;
      zipCode: string;
    }>,
  ) => void;
  setCheckoutMode: (
    value: React.SetStateAction<"user" | "guest" | null>,
  ) => void;
  customerInfo: {
    email: string;
    phone: string;
  };
  setCustomerInfo: (
    value: React.SetStateAction<{
      email: string;
      phone: string;
    }>,
  ) => void;
}

export default function CustomerInfo({
  user,
  checkoutMode,
  setStep,
  billingInfo,
  setBillingInfo,
  setCheckoutMode,
  customerInfo,
  setCustomerInfo,
}: Props) {
  console.log(checkoutMode);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Your Information</h3>

      {!checkoutMode && (
        <div className="space-y-4">
          <p className="text-gray-600">How would you like to continue?</p>
          <div className="grid grid-cols-2 gap-4">
            {user ? (
              <button
                onClick={() => setCheckoutMode("user")}
                className="rounded-lg border-2 border-blue-600 p-6 transition-colors hover:bg-blue-50"
              >
                <FaUser className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                <p className="font-semibold text-gray-900">
                  Continue as {user.name}
                </p>
                <p className="mt-1 text-sm text-gray-600">{user.email}</p>
              </button>
            ) : (
              <button
                onClick={() => setCheckoutMode("user")}
                className="rounded-lg border-2 border-gray-300 p-6 transition-colors hover:bg-gray-50"
              >
                <FaUser className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                <p className="font-semibold text-gray-900">Sign In</p>
                <p className="mt-1 text-sm text-gray-600">Use your account</p>
              </button>
            )}

            <button
              onClick={() => setCheckoutMode("guest")}
              className="rounded-lg border-2 border-gray-300 p-6 transition-colors hover:bg-gray-50"
            >
              <FaUser className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              <p className="font-semibold text-gray-900">Continue as Guest</p>
              <p className="mt-1 text-sm text-gray-600">No account needed</p>
            </button>
          </div>
        </div>
      )}

      {checkoutMode && (
        <>
          <div className="space-y-4 rounded-lg bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">
                Customer Information
              </h4>
              {checkoutMode === "user" && user && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
                  Logged in as {user.name}
                </span>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    email: e.target.value,
                  })
                }
                disabled={checkoutMode === "user" && !!user}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-gray-900">
              Billing Address
            </h4>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={billingInfo.firstName}
                  onChange={(e) =>
                    setBillingInfo({
                      ...billingInfo,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={billingInfo.lastName}
                  onChange={(e) =>
                    setBillingInfo({
                      ...billingInfo,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                value={billingInfo.address}
                onChange={(e) =>
                  setBillingInfo({
                    ...billingInfo,
                    address: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={billingInfo.city}
                  onChange={(e) =>
                    setBillingInfo({
                      ...billingInfo,
                      city: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  value={billingInfo.country}
                  onChange={(e) =>
                    setBillingInfo({
                      ...billingInfo,
                      country: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="USA"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={billingInfo.zipCode}
                  onChange={(e) =>
                    setBillingInfo({
                      ...billingInfo,
                      zipCode: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (checkoutMode && !user) {
                  setCheckoutMode(null);
                } else {
                  setStep(1);
                }
              }}
              className="w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold transition-colors hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!billingInfo.firstName || !customerInfo.email}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Review Order
            </button>
          </div>
        </>
      )}

      {!checkoutMode && (
        <button
          onClick={() => setStep(1)}
          className="w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold transition-colors hover:bg-gray-50"
        >
          Back
        </button>
      )}
    </div>
  );
}
