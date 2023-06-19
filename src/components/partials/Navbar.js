import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "./navbar/Search";
import Logo from "./navbar/Logo";
import Profile from "./navbar/Profile";

const Navbar = ({ user }) => {
  const [y, setY] = useState(0);
  const route = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    const position = window.pageYOffset;
    setY(position);
  }

  return (
    <div className="fixed w-full">
      <nav
        className={
          (y === 0 ? "shadow-none" : "shadow-md") +
          " flex h-20 w-full items-center justify-between bg-slate-900 px-2 lg:grid lg:px-24 " +
          (route.pathname !== "/" ? "lg:grid-cols-2" : "lg:grid-cols-3")
        }
      >
        <div className="ml-3 flex flex-row lg:ml-0 lg:mr-0">
          <Logo />
        </div>
        {user === null ? (
          ""
        ) : (
          <>
            <div
              className={
                (route.pathname !== "/" ? "hidden" : "block") + " mx-4"
              }
            >
              <Search />
            </div>
            <div className="mr-3 flex justify-end lg:mr-0">
              <Profile user={user} />
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
