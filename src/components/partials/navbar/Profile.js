import { useState } from "react";
import { auth } from "../../../services/firebase";

const Profile = ({ user }) => {
  const [dropdown, setDropdown] = useState(false);

  function toggleDropdown() {
    setDropdown(!dropdown);
  }

  return (
    <div className="flex flex-col">
      <div
        className="w-10 cursor-pointer overflow-hidden rounded-full bg-slate-700"
        onClick={toggleDropdown}
      >
        <img src={user.photoURL} alt="user" className="h-full" />
      </div>
      <div
        className={
          (dropdown ? "flex" : "hidden") +
          " absolute right-0 mt-12 mr-5 rounded-lg bg-red-700 shadow-lg md:mr-24"
        }
      >
        <button
          className="rounded-lg px-4 py-2 hover:bg-red-800"
          onClick={() => auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
