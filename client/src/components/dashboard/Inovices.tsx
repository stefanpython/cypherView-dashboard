import Search from "../invoices/Search";
import CreateInvoice from "../invoices/CreateInvoice";
import Table from "../invoices/Table";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ReactPaginate from "react-paginate";

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

export default function Invoices() {
  const [cookies] = useCookies(["token"]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [pageNumber, setPageNumber] = useState(0);
  const invoicesPerPage = 5;

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const pageCount = Math.ceil(invoices.length / invoicesPerPage);

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter((invoice) => {
    const fullName = `${invoice.customer.firstName} ${invoice.customer.lastName}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const displayInvoices = filteredInvoices
    .slice(pageNumber * invoicesPerPage, (pageNumber + 1) * invoicesPerPage)
    .map((invoice) => invoice);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search setSearchQuery={setSearchQuery} />
        <CreateInvoice />
      </div>

      <Table invoices={displayInvoices} setInvoices={setInvoices} />

      <div className="mt-5 flex w-full justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"flex items-center justify-center mt-6"}
          pageClassName={"mx-1"}
          previousLinkClassName={"border border-gray-300 px-3 py-1 rounded-sm"}
          nextLinkClassName={"border border-gray-300 px-3 py-1 rounded-sm"}
          pageLinkClassName={"border border-gray-300 px-3 py-1 rounded-sm"}
          activeClassName={"bg-blue-500 text-white rounded-sm"}
          disabledClassName={"text-gray-400"}
        />
      </div>
    </div>
  );
}
