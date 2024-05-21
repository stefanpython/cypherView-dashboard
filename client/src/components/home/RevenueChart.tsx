import { LuCalendarClock } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useCookies } from "react-cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Invoice {
  _id: string;
  amount: number;
  date: string;
}

export default function RevenueChart() {
  const chartRef = useRef(null);

  const [cookies] = useCookies(["token"]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [revenueData, setRevenueData] = useState<
    { month: string; revenue: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      setInvoices(data.invoices);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    if (invoices.length === 0) return;

    // Transform invoice data into revenue data
    const transformedData = invoices.map((invoice) => {
      return {
        month: new Date(invoice.date)
          .toLocaleString("default", { month: "short" })
          .slice(0, 3),
        revenue: invoice.amount,
      };
    });

    setRevenueData(transformedData);
  }, [invoices]);

  useEffect(() => {
    if (revenueData.length === 0) return;

    // Sort revenueData by month
    const sortedData = revenueData.sort((a, b) => {
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
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

    const labels = sortedData.map((item) => item.month);
    const data = sortedData.map((item) => item.revenue);

    const config = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // @ts-ignore
    const chart = new Chart(chartRef.current, config);

    return () => {
      chart.destroy();
    };
  }, [revenueData]);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Recent Revenue</h2>

      <div className="rounded-xl bg-gray-50 p-4">
        {loading ? (
          <Skeleton height={300} />
        ) : (
          <canvas className="bg-white" ref={chartRef}></canvas>
        )}

        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4"></div>
        <div className="flex items-center pb-2 pt-6">
          <LuCalendarClock />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 6 months</h3>
        </div>
      </div>
    </div>
  );
}
