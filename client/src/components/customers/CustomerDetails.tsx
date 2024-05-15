import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

import { IoReturnDownBack } from "react-icons/io5";
import { Link } from "react-router-dom";

interface CustomerProps {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  createdAt: string;
}

export default function CustomerDetails() {
  const { customerId } = useParams();
  const [cookies, setCookies] = useCookies(["token"]);

  const [customer, setCustomer] = useState<CustomerProps>();

  // Fetch customer details
  const fetchCustomerDetails = async () => {
    try {
      const res = await fetch(`http://localhost:3000/customers/${customerId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      if (!res.ok) {
        const invoicesData = await res.json();
        throw new Error(invoicesData.message);
      }

      const data = await res.json();
      setCustomer(data.customer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  console.log(customer);

  // Format date
  const formatDate = (dateString: any) => {
    const inputDate = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${
      months[inputDate.getMonth()]
    } ${inputDate.getDate()}, ${inputDate.getFullYear()}`;
  };

  return (
    <div className="mt-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Customer Information
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Avatar</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                <img
                  src={`http://localhost:3000/images/${customer?.image}`}
                  alt="Customer"
                  className="h-20 w-20 rounded-md"
                />
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">First Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {customer?.firstName}
              </dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {customer?.lastName}
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {customer?.email}
              </dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Joined at:</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {formatDate(customer?.createdAt)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Link to="/dashboard/customers">
          <button className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <span className="hidden md:block">Back</span>{" "}
            <IoReturnDownBack className="h-5 md:ml-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}
