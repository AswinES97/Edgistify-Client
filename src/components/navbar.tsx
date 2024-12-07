import { Link } from "react-router-dom";

export const Navbar = () => {

  return (
    <nav className="w-full h-24 bg-black shadow-sm flex justify-between fixed top-0 z-20 shadow-white">
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
          <button className="bg-white text-black rounded-lg p-2 border-[1px] hover:bg-black hover:text-white hover:border-white hover:border-[1px]">
            <Link to={"/signin"}>SignIn</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};
