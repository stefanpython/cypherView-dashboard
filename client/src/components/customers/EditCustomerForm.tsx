import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams, useNavigate } from "react-router-dom";

interface CustomerProps {
  firstName: string;
  lastName: string;
  email: string;
  image: string | File;
}

export default function EditCustomerForm() {
  const [cookies] = useCookies(["token"]);
  const [customerDetails, setCustomerDetails] = useState<CustomerProps>({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });
  const navigate = useNavigate();

  const { customerId } = useParams();

  // Fetch customer details
  const fetchCustomerById = async () => {
    try {
      const res = await fetch(`http://localhost:3000/customers/${customerId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const data = await res.json();
      setCustomerDetails(data.customer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerById();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle input change for images
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    setCustomerDetails((prevData) => ({ ...prevData, image: file }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create new FormData
    const formData = new FormData();

    formData.append("firstName", customerDetails.firstName);
    formData.append("lastName", customerDetails.lastName);
    formData.append("email", customerDetails.email);
    formData.append("image", customerDetails.image);

    try {
      const response = await fetch(
        `http://localhost:3000/customers/${customerId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const customerData = await response.json();
      console.log("Customer updated successfully", customerData);

      // Reset input fields after successful form submission
      setCustomerDetails({
        firstName: "",
        lastName: "",
        email: "",
        image: "",
      });

      // Confirm successfull operation with pop-up
      window.alert("Customer updated successfully!");

      navigate("/dashboard/customers");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(customerDetails);

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Customers/Edit</h1>
      </div>

      <form onSubmit={handleSubmit}>
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
              required
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter first name"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              value={customerDetails.firstName}
              onChange={handleChange}
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
              required
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter last name"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              value={customerDetails.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              required
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              value={customerDetails.email}
              onChange={handleChange}
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
              onChange={handleFileChange}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
