import { HiOutlineArrowPath } from "react-icons/hi2";

export default function LatestInvoices() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {/* {latestInvoices.map((invoice, i) => {
        return (
          <div
            key={invoice.id}
            className={
              'flex flex-row items-center justify-between py-4'
            
            }
          >
            <div className="flex items-center">
             PROFILE PICTURE HERE
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold md:text-base">
                  {invoice.name}
                </p>
                <p className="hidden text-sm text-gray-500 sm:block">
                  {invoice.email}
                </p>
              </div>
            </div>
            <p
              className={` truncate text-sm font-medium md:text-base`}
            >
              {invoice.amount}
            </p>
          </div>
        );
      })}  MAP OVER INVOICES HERE*/}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <HiOutlineArrowPath />

          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
