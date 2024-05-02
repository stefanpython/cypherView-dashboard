import { CiMoneyBill } from "react-icons/ci";
import { WiTime3 } from "react-icons/wi";
import { BsEnvelopePaper } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface TotalCollectedData {
  totalCollectedAmount: string;
}

export default function CardWrapper() {
  const [cookies, setCookies] = useCookies(["token"]);
  const [totalCollected, setTotalCollected] =
    useState<TotalCollectedData | null>(null);

  const fetchTotalCollected = async () => {
    try {
      // Try to fetch total collected $ amount
      const res = await fetch(
        "http://localhost:3000/invoices/total-collected",
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

  useEffect(() => {
    fetchTotalCollected();
  }, []);

  console.log(totalCollected);
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
          $ {totalCollected?.totalCollectedAmount}
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
          value
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
          value
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
          value
        </p>
      </div>
    </div>
  );
}
