import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface Invoice {
  _id: string;
  amount: number;
  createdAt: string;
  customer: {
    createdAt: string;
    email: string;
    firstName: string;
    image: string;
    lastName: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  date: string;
  status: string;
  updatedAt: string;
  __v: number;
}

export default function LatestInvoices() {
  const [cookies, setCookies] = useCookies(["token"]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Fetch Invoices
  const fetchInvoices = async () => {
    try {
      const res = await fetch("http://localhost:3000/invoices", {
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
      setInvoices(data.invoices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // console.log(invoices);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Latest Invoices</h2>
      <div className="flex-grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {invoices &&
            invoices.slice(-5).map(
              (
                invoice: Invoice // Provide type for invoice
              ) => (
                <div
                  key={invoice._id}
                  className="flex flex-row items-center justify-between py-4"
                >
                  <div className="flex items-center">
                    {/* Display customer profile picture here */}
                    <img
                      className="w-10 h-10 rounded-full object-cover mr-2"
                      src={`http://localhost:3000/images/${invoice.customer.image}`}
                      alt="customer image"
                    />
                    <div className="min-w-0">
                      {/* Display customer name */}
                      <p className="truncate text-sm font-semibold md:text-base">
                        {invoice.customer.firstName} {invoice.customer.lastName}
                      </p>
                      {/* Display customer email */}
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {invoice.customer.email}
                      </p>
                    </div>
                  </div>
                  {/* Display invoice amount */}
                  <p className="truncate text-sm font-medium md:text-base">
                    $ {invoice.amount}
                  </p>
                </div>
              )
            )}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <img className="w-4" src="./circle.png" alt="circle" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
