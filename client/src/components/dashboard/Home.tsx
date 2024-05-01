import CardWrapper from "../home/CardWrapper";
import RevenueChart from "../home/RevenueChart";
import LatestInvoices from "../home/LatestInvoices";

export default function Home() {
  return (
    <main>
      <h1 className=" mb-4 text-xl md:text-2xl">Dashboard</h1>

      <CardWrapper />

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart />

        <LatestInvoices />
      </div>
    </main>
  );
}
