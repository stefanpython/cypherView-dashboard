import CreateCustomer from "../customers/CreateCustomerButton";
import CustomersTable from "../customers/CustomersTable";
import SearchCustomers from "../customers/SearchCustomers";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { jwtDecode } from "jwt-decode";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

interface DecodedToken {
  role: string;
}

export default function Customers() {
  const [cookies] = useCookies(["token"]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [pageNumber, setPageNumber] = useState(0);
  const customersPerPage = 5;

  // Fetch Customers List
  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:3000/customers", {
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
      setCustomers(data.customers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers based on search query
  const filteredInvoices = customers.filter((customer) => {
    const fullName = `${customer.firstName} ${customer.lastName}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const pageCount = Math.ceil(customers.length / customersPerPage);

  const displayCustomers = filteredInvoices
    .slice(pageNumber * customersPerPage, (pageNumber + 1) * customersPerPage)
    .map((invoice) => invoice);

  // Delete customer
  const deleteCustomer = async (customerId: string) => {
    try {
      if (isDemo) {
        window.alert("Unauthorized access!");
      } else {
        const confirmation = window.confirm("Are you sure?");
        if (confirmation) {
          const res = await fetch(
            `http://localhost:3000/customers/${customerId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message);
          }

          // Remove the deleted customer from the state
          setCustomers(
            customers.filter((customer) => customer._id !== customerId)
          );
        } else return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Decode the token
  const decodedToken = jwtDecode<DecodedToken>(cookies.token);
  const isDemo = decodedToken.role === "demo";

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchCustomers setSearchQuery={setSearchQuery} />
        <CreateCustomer />
      </div>

      <CustomersTable
        customers={displayCustomers}
        deleteCustomer={deleteCustomer}
      />

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
