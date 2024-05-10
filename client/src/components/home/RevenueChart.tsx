import { LuCalendarClock } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useCookies } from "react-cookie";

interface Invoice {
  _id: string;
  amount: number;
  date: string;
}

export default function RevenueChart() {
  const chartRef = useRef(null);

  const [cookies, setCookies] = useCookies(["token"]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [revenueData, setRevenueData] = useState<
    { month: string; revenue: number }[]
  >([]);

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
    // Transform invoice data into revenue data
    const transformedData = invoices.map((invoice) => {
      // console.log(invoice.date);
      return {
        month: new Date(invoice.date)
          .toLocaleString("default", {
            month: "short",
          })
          .slice(0, 3),
        revenue: invoice.amount,
      };
    });

    setRevenueData(transformedData);
  }, [invoices]);

  useEffect(() => {
    fetchInvoices();
  }, []);

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
    const chart = new Chart(chartRef?.current, config);

    return () => {
      chart.destroy();
    };
  }, [revenueData]);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Recent Revenue</h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <canvas className="bg-white" ref={chartRef}></canvas>

        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4">
          <div className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex">
            {/* MAP FOR LABEL  */}
          </div>

          {/* {revenue.map((month) => (
        <div key={month.month} className="flex flex-col items-center gap-2">
          <div
            className="w-full rounded-md bg-blue-300"
            style={{
              height: `${(chartHeight / topLabel) * month.revenue}px`,
            }}
          ></div>
          <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
            {month.month}
          </p>
        </div>
      ))}  MAP REVENUE HERE */}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <LuCalendarClock />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 6 months</h3>
        </div>
      </div>
    </div>
  );
}
