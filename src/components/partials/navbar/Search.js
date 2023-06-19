import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../../features/notesSlice";

const Search = () => {
  const [focus, setFocus] = useState(false);
  const dispatch = useDispatch();

  const toggleFocus = () => {
    setFocus(!focus);
  };

  const searchNote = (e) => {
    let keyword = e.target.value;
    dispatch(search(keyword));
  };

  return (
    <div
      className={
        (focus ? "border-blue-500" : "border-transparent") +
        " flex w-full flex-row items-center rounded-lg border-b-2 bg-slate-800 px-5 py-3 shadow-xl duration-75 ease-in hover:bg-slate-700"
      }
    >
      <SearchIcon className="mr-3 h-5 w-5" />
      <input
        onInput={searchNote}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        type="text"
        className="w-full bg-transparent text-slate-100 outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
