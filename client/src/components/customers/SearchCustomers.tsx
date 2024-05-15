interface Props {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchCustomers({ setSearchQuery }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Search for customer..."
        onChange={handleChange}
      />
      <img
        src="./magnifier.png"
        alt="magnifier"
        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
      />
    </div>
  );
}
