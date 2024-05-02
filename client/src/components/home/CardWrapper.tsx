import { CiMoneyBill } from "react-icons/ci";
import { WiTime3 } from "react-icons/wi";
import { BsEnvelopePaper } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";

export default function CardWrapper() {
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
          value
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
