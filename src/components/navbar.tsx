import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

export const Navbar = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate()

  const handleSignout = () => {
    setToken(null)
    toast.success("Logged Out Successfully")
    
    setTimeout(() => {
      navigate('/signin')
    }, 500);
  };

  return (
    <nav className="w-full h-24 bg-black shadow-md flex justify-between fixed top-0 z-20 shadow-gray-700">
      <ul className="ps-12"></ul>
      <ul className="text-white flex justify-center pt-8 font-thin gap-5">
        <li className="hover:text-gray-500 hover:cursor-pointer">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="hover:text-gray-500 hover:cursor-pointer">
          <Link to={"/cart"}>Cart</Link>
        </li>
      </ul>
      <ul className="text-white flex justify-center pt-6 font-thin gap-5">
        <li className="hover:text-gray-500 hover:cursor-pointer pe-12">
          {!token ? (
            <button className="bg-white text-black rounded-lg p-2 border-[1px] hover:bg-black hover:text-white hover:border-white hover:border-[1px]">
              <Link to={"/signin"}>SignIn</Link>
            </button>
          ) : (
            <button
              onClick={handleSignout}
              className="bg-white text-black rounded-lg p-2 border-[1px] hover:bg-black hover:text-white hover:border-white hover:border-[1px]"
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
