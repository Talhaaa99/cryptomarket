import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl">CryptoMarket</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      {/* user sign in sign out buttons and function */}
      {user?.email ? (
        <div className="hidden md:block">
          <Link className="p-4 hover:text-accent " to="/account">
            Account
          </Link>
          <Link
            onClick={handleSignOut}
            className="rounded-2xl text-btnText bg-red-700 py-2 px-5 ml-2 hover:shadow-2xl shadow-xl"
            to="/"
          >
            Sign Out
          </Link>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link className="p-4 hover:text-accent " to="/signin">
            Sign In
          </Link>
          <Link
            className="rounded-2xl text-btnText bg-button py-2 px-5 ml-2 hover:shadow-2xl shadow-xl"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      )}
      <div onClick={handleNav} className="block md:hidden z-10 cursor-pointer">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col justify-between items-center bg-primary w-full h-[90%] z-10 ease-in duration-300"
            : "fixed left-[-100%] top-20 flex flex-col justify-between items-center bg-primary w-full h-[90%] z-10 ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleNav} className="border-b py-8">
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleNav} className="border-b py-8">
            <Link to="/account">Account</Link>
          </li>
          <li className="py-8">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col w-full py-4 px-2">
          <Link to="/signin">
            <button
              onClick={handleNav}
              className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl"
            >
              Sign In
            </button>
          </Link>
          <Link onClick={handleNav} to="/signup">
            <button className="rounded-2xl text-btnText bg-button w-full my-2 p-3 shadow-xl">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
