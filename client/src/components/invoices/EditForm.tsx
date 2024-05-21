import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

interface Invoice {
  amount: number;
  status: string;
  customer: string;
}

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}

export default function EditForm() {
  const [cookies] = useCookies(["token"]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoice, setInvoice] = useState<Invoice | undefined>();

  const [amount, setAmount] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const { invoiceId } = useParams();
  const navigate = useNavigate();

  // Fetch invoice details by id
  const fetchInvoiceById = async () => {
    try {
      const res = await fetch(
        `https://cypherview-dashboard-1.onrender.com/invoices/${invoiceId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (!res.ok) {
        const invoiceData = await res.json();
        throw new Error(invoiceData.message);
      }

      const data = await res.json();
      setInvoice(data.invoice);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const res = await fetch(
        "https://cypherview-dashboard-1.onrender.com/customers",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (!res.ok) {
        const customerData = await res.json();
        throw new Error(customerData.message);
      }

      const data = await res.json();
      setCustomers(data.customers);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://cypherview-dashboard-1.onrender.com/invoices/${invoiceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          body: JSON.stringify({ amount, status }),
        }
      );

      if (!res.ok) {
        const customerData = await res.json();
        throw new Error(customerData.message);
      }

      const updatedData = await res.json();
      console.log("Product updated successfully:", updatedData);

      window.alert("Invoice updated successfully!");

      navigate("/dashboard/invoices", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchInvoiceById();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Customer Name */}
          <div className="mb-4">
            <label
              htmlFor="customer"
              className="mb-2 block text-sm font-medium"
            >
              Choose customer
            </label>
            <div className="relative">
              <select
                id="customer"
                name="customerId"
                value={invoice?.customer}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="" disabled>
                  Select a customer
                </option>
                {customers &&
                  customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.firstName} {customer.lastName}
                    </option>
                  ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Invoice Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Choose an amount
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  defaultValue={invoice?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter USD amount"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Invoice Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Set the invoice status
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="pending"
                    name="status"
                    type="radio"
                    value="pending"
                    defaultChecked={invoice && invoice?.status === "pending"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="pending"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Pending <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="paid"
                    name="status"
                    type="radio"
                    value="paid"
                    defaultChecked={invoice && invoice?.status === "paid"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="paid"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Paid <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link to="/dashboard/invoices">
            <button className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
              Cancel
            </button>
          </Link>

          <button
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            type="submit"
          >
            Edit Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
