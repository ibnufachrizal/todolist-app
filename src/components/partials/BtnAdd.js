import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";

const BtnAdd = () => {
  return (
    <div className="fixed bottom-0 right-0 mb-10 mr-8 lg:mr-16">
      <Link
        to="note"
        className="flex items-center justify-center rounded-full bg-blue-600 p-4 shadow-xl hover:bg-blue-700"
      >
        <PlusIcon className="h-5 w-5 text-slate-100" />
      </Link>
    </div>
  );
};

export default BtnAdd;
