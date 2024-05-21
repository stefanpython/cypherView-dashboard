import { useState, useEffect } from "react";
import InvoiceStatus from "./Status";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface DecodedToken {
  role: string;
}

export default function Table({ invoices, setInvoices }: any) {
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (invoices.length > 0) {
      setLoading(false);
    }
  }, [invoices]);

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

  // Handle delete function
  const handleDelete = async (id: string) => {
    try {
      if (isDemo) {
        window.alert("Unauthorized operation!");
      } else {
        const confirmation = window.confirm("Are you sure?");

        if (confirmation) {
          const res = await fetch(`http://localhost:3000/invoices/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.token}`,
            },
          });

          if (!res.ok) {
            throw new Error("Failed to delete invoice");
          }

          // If deletion is successful, remove the invoice from the state
          setInvoices((prevInvoices: any) =>
            prevInvoices.filter((invoice: any) => invoice._id !== id)
          );

          window.alert("Invoice deleted successfully!");
        } else {
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Decode the token
  const decodedToken = jwtDecode<DecodedToken>(cookies.token);
  const isDemo = decodedToken.role === "demo";

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <div className="mb-2 flex items-center">
                            <Skeleton circle={true} height={40} width={40} />
                            <Skeleton width={150} className="ml-2" />
                          </div>
                          <Skeleton width={200} />
                        </div>
                        <Skeleton width={100} />
                      </div>
                      <div className="flex w-full items-center justify-between pt-4">
                        <div>
                          <Skeleton width={70} height={24} />
                          <Skeleton width={100} />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Skeleton width={30} height={30} />
                          <Skeleton width={30} height={30} />
                        </div>
                      </div>
                    </div>
                  ))
              : invoices?.map((invoice: any) => (
                  <div
                    key={invoice._id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <img
                            className="w-10 h-10 rounded-full object-cover mr-2"
                            src={`http://localhost:3000/images/${invoice.customer.image}`}
                            alt="customer image"
                          />
                          <p>
                            {invoice.customer.firstName}{" "}
                            {invoice.customer.lastName}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {invoice.customer.email}
                        </p>
                      </div>
                      <InvoiceStatus status={invoice.status} />
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p className="text-xl font-medium">${invoice.amount}</p>
                        <p>{formatDate(invoice.date)}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Link to={`/dashboard/edit/${invoice._id}`}>
                          <button className="rounded-md border p-2 hover:bg-gray-100">
                            <PencilIcon className="w-5" />
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDelete(invoice._id)}
                          className="rounded-md border p-2 hover:bg-gray-100"
                        >
                          <span className="sr-only">Delete</span>
                          <TrashIcon className="w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loading
                ? Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className="w-full border-b py-3 text-sm">
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            <Skeleton circle={true} height={40} width={40} />
                            <Skeleton width={150} />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <Skeleton width={200} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <Skeleton width={70} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <Skeleton width={100} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <Skeleton width={100} />
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex justify-end gap-3">
                            <Skeleton width={30} height={30} />
                            <Skeleton width={30} height={30} />
                          </div>
                        </td>
                      </tr>
                    ))
                : invoices?.map((invoice: any) => (
                    <tr
                      key={invoice._id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-full object-cover mr-2"
                            src={`http://localhost:3000/images/${invoice.customer.image}`}
                            alt="customer image"
                          />
                          <p>
                            {invoice.customer.firstName}{" "}
                            {invoice.customer.lastName}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {invoice.customer.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        ${invoice.amount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatDate(invoice.date)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <InvoiceStatus status={invoice.status} />
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <Link to={`/dashboard/edit/${invoice._id}`}>
                            <button className="rounded-md border p-2 hover:bg-gray-100">
                              <PencilIcon className="w-5" />
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDelete(invoice._id)}
                            className="rounded-md border p-2 hover:bg-gray-100"
                          >
                            <span className="sr-only">Delete</span>
                            <TrashIcon className="w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
