import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import NoteSkeleton from "../skeleton/NoteSkeleton";
import Spinner from "../partials/Spinner";

const Note = ({ user }) => {
  const notesCollectionRef = collection(db, "notes");
  const [note, setNote] = useState("");
  const [num, setNum] = useState(0);
  const { id } = useParams();
  const [skeleton, setSkeleton] = useState(id ? true : false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const createNote = async () => {
    setLoading(true);
    await addDoc(notesCollectionRef, {
      desc: document.getElementById("txt").value,
      done: false,
      uid: user.uid,
    }).then(() => {
      navigate("/");
    });
  };

  const updateNote = async () => {
    setLoading(true);
    await updateDoc(doc(db, "notes", id), {
      desc: document.getElementById("txt").value,
    }).then(() => {
      navigate("/");
    });
  };

  const getNoteById = async () => {
    const noteById = doc(db, "notes", id);
    const snap = await getDoc(noteById);
    if (snap.exists()) {
      setNote(snap.data().desc);
      setNum(snap.data().desc.length);
      setSkeleton(false);
    }
  };

  function increaseChar(e) {
    let val = e.target.value;
    setNum(val.length);
  }

  useEffect(() => {
    if (id !== undefined) getNoteById();
  }, []);

  return (
    <div className="flex h-screen flex-col items-start px-5 pt-20 lg:px-24">
      <div className="flex w-full flex-row items-center justify-between">
        <Link to="/" className="rounded-full p-2 hover:bg-slate-800">
          <ArrowLeftIcon className="h-10 w-10 text-slate-200" />
        </Link>
        <button
          onClick={id !== undefined ? updateNote : createNote}
          className={
            (num < 1 ? "hidden" : "flex") +
            " h-14 w-14 items-center justify-center rounded-full p-2 outline-none hover:bg-green-800 active:bg-green-900 disabled:bg-transparent disabled:hover:bg-transparent"
          }
          disabled={loading}
        >
          {loading ? (
            <Spinner action={"note"} />
          ) : (
            <CheckIcon className="h-10 w-10 text-slate-200" />
          )}
        </button>
      </div>
      {skeleton ? (
        <NoteSkeleton />
      ) : (
        <>
          <textarea
            onInput={increaseChar}
            maxLength="100"
            defaultValue={note}
            id="txt"
            className="mt-5 h-full w-full resize-none border-none bg-transparent p-3 text-2xl text-slate-200 outline-none"
            placeholder="What do you think..."
          ></textarea>
          <div className="mb-10 flex w-full justify-end">
            <span className="mr-0.5 font-medium text-blue-500">{num}</span> /
            100
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
