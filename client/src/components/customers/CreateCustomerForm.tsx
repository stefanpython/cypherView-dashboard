import { Link } from "react-router-dom";

export default function CreateCustomerForm() {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Customers/Create</h1>
      </div>

      <form>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* First Name */}
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter first name"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter last name"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label htmlFor="image" className="mb-2 block text-sm font-medium">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link to="/dashboard/customers">
            <button className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
              Cancel
            </button>
          </Link>

          <button
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            type="submit"
          >
            Add customer
          </button>
        </div>
      </form>
    </div>
  );
}
