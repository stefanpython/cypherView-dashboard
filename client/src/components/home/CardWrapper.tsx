import { CiMoneyBill } from "react-icons/ci";
import { WiTime3 } from "react-icons/wi";
import { BsEnvelopePaper } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface TotalCollectedData {
  totalCollectedAmount: string;
}

interface TotalPendingData {
  totalPendingAmount: string;
}

interface TotalInvoicesData {
  invoices: string;
}

interface TotalCustomersData {
  customers: string;
}

export default function CardWrapper() {
  const [cookies] = useCookies(["token"]);
  const [totalCollected, setTotalCollected] =
    useState<TotalCollectedData | null>(null);
  const [totalPending, setTotalPending] = useState<TotalPendingData | null>(
    null
  );
  const [totalInvoices, setTotalInvoices] = useState<TotalInvoicesData | null>(
    null
  );
  const [totalCustomers, setTotalCustomers] =
    useState<TotalCustomersData | null>(null);

  // Fetch total amount of $ collected
  const fetchTotalCollected = async () => {
    try {
      // Try to fetch total collected $ amount
      const res = await fetch(
        "https://cypherview-dashboard-1.onrender.com/invoices/total-collected",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      // Check if response is ok
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      // Save fetched data
      const invoiceData = await res.json();
      setTotalCollected(invoiceData);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch pending amount of $
  const fetchPending = async () => {
    try {
      const res = await fetch(
        "https://cypherview-dashboard-1.onrender.com/invoices/total-pending",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const invoiceData = await res.json();
      setTotalPending(invoiceData);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch total number of invoices
  const fetchTotalInvoices = async () => {
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
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const invoiceData = await res.json();
      setTotalInvoices(invoiceData);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch total number or customers
  const fetchTotalCustomers = async () => {
    try {
      const res = await fetch(
        "https://cypherview-dashboard-1.onrender.com/customers",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const customerData = await res.json();
      setTotalCustomers(customerData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTotalCollected();
    fetchPending();
    fetchTotalInvoices();
    fetchTotalCustomers();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <h3 className="ml-2 text-sm font-medium flex items-center">
            <CiMoneyBill size={20} className="mr-1" /> Collected
          </h3>
        </div>

        <p
          className="
      truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
        >
          <span>{/* @ts-ignore */}</span>${totalCollected?.totalCollectedAmount}
        </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <h3 className="ml-2 text-sm font-medium flex items-center">
            <WiTime3 size={20} className="mr-1" />
            Pending
          </h3>
        </div>

        <p
          className="
      truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
        >
          $ {totalPending?.totalPendingAmount}
        </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <h3 className="ml-2 text-sm font-medium flex items-center">
            <BsEnvelopePaper size={15} className="mr-1" />
            Total Invoices
          </h3>
        </div>

        <p
          className="
      truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
        >
          {totalInvoices?.invoices.length}
        </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <h3 className="ml-2 text-sm font-medium flex items-center">
            <PiUsersThree size={20} className="mr-1" />
            Total Customers
          </h3>
        </div>

        <p
          className="
      truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
        >
          {totalCustomers?.customers.length}
        </p>
      </div>
    </div>
  );
}
