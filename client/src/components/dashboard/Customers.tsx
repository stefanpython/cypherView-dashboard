import CreateCustomer from "../customers/CreateCustomerButton";
import CustomersTable from "../customers/CustomersTable";
import SearchCustomers from "../customers/SearchCustomers";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export default function Customers() {
  const [cookies, setCookies] = useCookies(["token"]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchCustomers setSearchQuery={setSearchQuery} />
        <CreateCustomer />
      </div>

      <CustomersTable customers={filteredInvoices} />

      <div className="mt-5 flex w-full justify-center">
        {/* PAGINATION HERE */}
      </div>
    </div>
  );
}
