import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Logo = () => {
  return (
    <>
      <Link to="/" className="flex flex-row">
        <img src={logo} className="w-7" />
        <span className="ml-2 hidden md:flex">Notes</span>
      </Link>
    </>
  );
};

export default Logo;
