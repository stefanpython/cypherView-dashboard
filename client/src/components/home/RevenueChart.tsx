import { LuCalendarClock } from "react-icons/lu";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function RevenueChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]; // Sample months
    const data = [1000, 2000, 1500, 2500, 1800, 3000]; // Sample revenue data

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
  }, []);

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
