import { Link, useNavigate } from "react-router-dom";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiShutDownLine } from "react-icons/ri";
import { useCookies } from "react-cookie";
import { useAuth } from "./AuthContext";

const MenuItem = ({ icon: Icon, label }: any) => {
  return (
    <div className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer">
      <Icon size={20} />
      <p className="hidden md:block">{label}</p>
    </div>
  );
};

export default function Dashboard() {
  const [token, setToken] = useCookies(["token"]);

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  // Signout function
  const handleSignOut = () => {
    // Remove token cookie
    setToken("token", "", { path: "/" });

    // Set logged in status from private route to false
    setIsLoggedIn(false);

    // Redirect user to login page
    navigate("/login");
  };

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-50">
          <Link
            className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-400 p-4 md:h-40"
            to="/"
          >
            <div className="w-32 text-white md:w-40">CypherView</div>
          </Link>
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <MenuItem icon={IoHomeOutline} label="Home" />
            <MenuItem icon={LiaFileInvoiceDollarSolid} label="Invoices" />
            <MenuItem icon={PiUsersThreeLight} label="Customers" />

            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            <button
              onClick={handleSignOut}
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <RiShutDownLine size={20} />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        OTHER pages
      </div>
    </div>
  );
}
