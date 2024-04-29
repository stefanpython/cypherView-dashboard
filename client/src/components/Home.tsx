export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-zinc-400 bg- p-4 md:h-52"></div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div />
          <p
            className={`text-xl text-gray-800 md:text-3xl md:leading-normal }`}
          >
            <strong className="md:text-4xl">Welcome to CypherView.</strong>{" "}
            Uncover actionable customer insights with our
            <span className="text-blue-500"> powerful analytics </span>
            dashboard.
          </p>
          <a
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span>
          </a>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <img
            className="w-auto h-auto hidden md:block rounded-md"
            src="./home1.jpg"
            alt="homepage"
          />

          <img
            className="w-auto h-auto block sm:hidden rounded-md"
            src="./home1.jpg"
            alt="homepage"
          />
        </div>
      </div>
    </main>
  );
}
