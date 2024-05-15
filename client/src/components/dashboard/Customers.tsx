import CreateCustomer from "../customers/CreateCustomerButton";
import CustomersTable from "../customers/CustomersTable";
import SearchCustomers from "../customers/SearchCustomers";

export default function Customers() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchCustomers />
        <CreateCustomer />
      </div>

      <CustomersTable />

      <div className="mt-5 flex w-full justify-center">
        {/* PAGINATION HERE */}
      </div>
    </div>
  );
}
