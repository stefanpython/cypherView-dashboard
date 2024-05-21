import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [cookies] = useCookies(["token"]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Invoices
  const fetchInvoices = async () => {
    try {
      const res = await fetch(
        "https://cypherview-dashboard-1.onrender.com/invoices",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (!res.ok) {
        const invoicesData = await res.json();
        throw new Error(invoicesData.message);
      }

      const data = await res.json();
      setInvoices(data.invoices.reverse());
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Latest Invoices</h2>
      <div className="flex-grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {loading ? (
            // Show skeletons while loading
            <>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between py-4"
                >
                  <div className="flex items-center">
                    <Skeleton circle={true} height={40} width={40} />
                    <div className="min-w-0 ml-2">
                      <Skeleton width={100} />
                      <Skeleton width={150} />
                    </div>
                  </div>
                  <Skeleton width={50} />
                </div>
              ))}
            </>
          ) : (
            // Render invoices once data is loaded
            invoices &&
            invoices.slice(0, 5).map(
              (
                invoice: Invoice // Provide type for invoice
              ) => (
                <div
                  key={invoice._id}
                  className="flex flex-row items-center justify-between py-4"
                >
                  <div className="flex items-center">
                    <img
                      className="w-10 h-10 rounded-full object-cover mr-2"
                      src={`https://cypherview-dashboard-1.onrender.com/images/${invoice.customer.image}`}
                      alt="customer image"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">
                        {invoice.customer.firstName} {invoice.customer.lastName}
                      </p>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {invoice.customer.email}
                      </p>
                    </div>
                  </div>
                  <p className="truncate text-sm font-medium md:text-base">
                    $ {invoice.amount}
                  </p>
                </div>
              )
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
