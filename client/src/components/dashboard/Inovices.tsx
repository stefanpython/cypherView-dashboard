import Search from "../invoices/Search";
import CreateInvoice from "../invoices/CreateInvoice";
import Table from "../invoices/Table";
import { useState, useEffect } from "react";
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

export default function Invoices() {
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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search />
        <CreateInvoice />
      </div>

      <Table invoices={invoices} />

      <div className="mt-5 flex w-full justify-center">
        {/* PAGINATION HERE */}
      </div>
    </div>
  );
}
