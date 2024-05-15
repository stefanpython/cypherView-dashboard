import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

interface CustomersTableProps {
  customers: Customer[];
}

export default function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {customers?.map((customer: any) => (
              <div
                key={customer._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4 ">
                  <Link
                    to={`/dashboard/customers/details/${customer._id}`}
                    className="w-full"
                  >
                    <div className="mb-2 flex items-center w-full">
                      <img
                        className="w-10 h-10 rounded-full object-cover mr-2"
                        src={`http://localhost:3000/images/${customer.image}`}
                        alt="customer image"
                      />
                      <p>
                        {customer.firstName} {customer.lastName}
                      </p>
                    </div>
                  </Link>

                  <div className="flex w-full items-center justify-between pt-4">
                    <div className="flex justify-end flex-1 gap-2">
                      <Link to="/dashboard/edit/:invoiceId">
                        <button className="rounded-md border p-2 hover:bg-gray-100">
                          <PencilIcon className="w-5" />
                        </button>
                      </Link>

                      <button className="rounded-md border p-2 hover:bg-gray-100">
                        <span className="sr-only">Delete</span>
                        <TrashIcon className="w-4" />
                      </button>
                    </div>
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
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers?.map((customer: any) => (
                <tr
                  key={customer._id}
                  className="hover:bg-gray-100 cursor-pointer w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Link
                      to={`/dashboard/customers/details/${customer._id}`}
                      className="w-full"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover mr-2"
                          src={`http://localhost:3000/images/${customer.image}`}
                          alt="customer image"
                        />
                        <p>
                          {customer.firstName} {customer.lastName}
                        </p>
                      </div>
                    </Link>
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Link to={`/dashboard/customers/edit/${customer._id}`}>
                        <button className="rounded-md border p-2 hover:bg-gray-200">
                          <PencilIcon className="w-5" />
                        </button>
                      </Link>

                      <button className="rounded-md border p-2 hover:bg-gray-200">
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
