import { Link, useNavigate } from "react-router-dom";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiShutDownLine } from "react-icons/ri";
import { useCookies } from "react-cookie";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import Home from "./dashboard/Home";
import Invoices from "./dashboard/Inovices";
import Customers from "./dashboard/Customers";
import CreateInvoiceForm from "./invoices/CreateInvoiceForm";
import EditForm from "./invoices/EditForm";

import { Routes, Route } from "react-router-dom";
import CreateCustomerForm from "./customers/CreateCustomerForm";
import EditCustomerForm from "./customers/EditCustomerForm";
import CustomerDetails from "./customers/CustomerDetails";
import { jwtDecode } from "jwt-decode";
import Unauthorized from "../Unauthorized";

interface DecodedToken {
  role: string;
}

const MenuItem = ({ icon: Icon, label, selected, onClick }: any) => {
  // Define the base class name for the menu item
  let className =
    "flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer hover:bg-sky-100 hover:text-blue-600";

  // If the menu item is selected, add additional classes
  if (selected) {
    className += " bg-sky-100 text-blue-600";
  }

  return (
    <div className={className} onClick={onClick}>
      <Icon size={20} />
      <p className="hidden md:block">{label}</p>
    </div>
  );
};

export default function Dashboard() {
  const [token, setToken] = useCookies(["token"]);
  const [selectedTab, setSelectedTab] = useState("home");

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

  // Decode the token
  const decodedToken = jwtDecode<DecodedToken>(token.token);
  const isDemo = decodedToken.role === "demo";

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-50">
          <Link
            className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-400 p-4 md:h-40"
            to="/"
          >
            <div className="w-32 text-white md:w-40 flex items-center">
              <img className="w-12 h-12 mr-1" src="./eye.png" alt="eye logo" />
              <p className="text-xl font-medium"> CypherView</p>
            </div>
          </Link>
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <Link to="/">
              <MenuItem
                icon={IoHomeOutline}
                label="Home"
                selected={selectedTab === "home"}
                onClick={() => setSelectedTab("home")}
              />
            </Link>

            <Link to="/dashboard/invoices">
              <MenuItem
                icon={LiaFileInvoiceDollarSolid}
                label="Invoices"
                selected={selectedTab === "invoices"}
                onClick={() => setSelectedTab("invoices")}
              />
            </Link>

            <Link to="/dashboard/customers">
              <MenuItem
                icon={PiUsersThreeLight}
                label="Customers"
                selected={selectedTab === "customers"}
                onClick={() => setSelectedTab("customers")}
              />
            </Link>
            <div className="h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            <button
              onClick={handleSignOut}
              className="flex h-[48px] w-full grow items-center justify-end gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <RiShutDownLine size={20} />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route
            path="/create"
            element={isDemo ? <Unauthorized /> : <CreateInvoiceForm />}
          />
          <Route
            path="/edit/:invoiceId"
            element={isDemo ? <Unauthorized /> : <EditForm />}
          />

          <Route path="/customers" element={<Customers />} />
          <Route
            path="/customers/create"
            element={isDemo ? <Unauthorized /> : <CreateCustomerForm />}
          />
          <Route
            path="/customers/edit/:customerId"
            element={isDemo ? <Unauthorized /> : <EditCustomerForm />}
          />
          <Route
            path="/customers/details/:customerId"
            element={<CustomerDetails />}
          />
        </Routes>
      </div>
    </div>
  );
}
