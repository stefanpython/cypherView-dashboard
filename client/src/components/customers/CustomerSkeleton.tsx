import Skeleton from "react-loading-skeleton";

export default function CustomerSkeleton() {
  return (
    <div className="w-full rounded-md bg-white p-1">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="w-full">
          <div className="flex items-center w-full">
            <Skeleton circle={true} width={40} height={40} />
            <Skeleton width={100} />
          </div>
        </div>

        <div className="flex w-full items-center justify-between pt-1">
          <div className="flex justify-end flex-1 gap-2">
            <Skeleton circle={true} width={32} height={32} />
            <Skeleton circle={true} width={32} height={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
