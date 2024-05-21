import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}

export default function CreateInvoiceForm() {
  const [cookies] = useCookies(["token"]);
  const [customers, setCustomers] = useState<Customer[]>();

  const [customer, setCustomer] = useState<string | undefined>();
  const [amount, setAmount] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const navigate = useNavigate();

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:3000/customers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

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

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({ customer, amount, status }),
      });

      if (!res.ok) {
        const invoiceData = await res.json();
        throw new Error(invoiceData.message);
      }

      window.alert("Invoice created successfully!");

      navigate("/dashboard/invoices", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Invoices/Create</h1>
      </div>
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
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
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

            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.customerId &&
          state.errors.customerId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))} */}
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
                  placeholder="Enter USD amount"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>

            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.amount &&
          state.errors.amount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))} */}
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
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    aria-describedby="status-error"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <label
                    htmlFor="pending"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Pending
                    <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="paid"
                    name="status"
                    type="radio"
                    value="paid"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <label
                    htmlFor="paid"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Paid
                    <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>

              <div id="amount-error" aria-live="polite" aria-atomic="true">
                {/* {state.errors?.status &&
            state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))} */}
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
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
