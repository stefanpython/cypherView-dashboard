import Search from "../invoices/Search";
import CreateInvoice from "../invoices/CreateInvoice";
import Table from "../invoices/Table";

export default function Inovices() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search />
        <CreateInvoice />
      </div>

      <Table />

      <div className="mt-5 flex w-full justify-center">
        {/* PAGINATION HERE */}
      </div>
    </div>
  );
}
