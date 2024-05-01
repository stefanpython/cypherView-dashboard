import React from "react";

export default function CardWrapper() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <h3 className="ml-2 text-sm font-medium">title</h3>
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
          <h3 className="ml-2 text-sm font-medium">title</h3>
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
          <h3 className="ml-2 text-sm font-medium">title</h3>
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
          <h3 className="ml-2 text-sm font-medium">title</h3>
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
