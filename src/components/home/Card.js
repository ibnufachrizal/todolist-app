import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../services/firebase";
import NoData from "./NoData";
import Spinner from "../partials/Spinner";
import { useSelector } from "react-redux";
import NoMatch from "../partials/NoMatch";

const Card = ({ notes }) => {
  const [more, setMore] = useState("");
  const [totalNote, setTotalNote] = useState(0);
  const [idDone, setIdDone] = useState("");
  const [loading, setLoading] = useState("");
  const [delLoad, setDelLoad] = useState("");
  const { value } = useSelector((state) => state.note);
  const [deleted, setDeleted] = useState([]);

  useEffect(() => {
    setTotalNote(notes.length);
  }, []);

  const showMore = (id) => {
    setMore(id);
  };

  const hideMore = () => {
    setMore("");
  };

  const removeElm = (id) => {
    setTotalNote(totalNote - 1);
    setDeleted((arr) => [...arr, id]);
    document.getElementById(id).classList.add("hidden");
  };

  const deleteNote = async (id) => {
    setDelLoad(id);
    await deleteDoc(doc(db, "notes", id)).then(() => {
      removeElm(id);
      notes = notes.splice(
        notes.findIndex((e) => e.id === id),
        1
      );
      setDelLoad("");
    });
  };

  const setDone = async (id) => {
    setLoading(id);
    await updateDoc(doc(db, "notes", id), {
      done: true,
    }).then(() => {
      setLoading("");
      setIdDone(id);
    });
  };

  const totalSearch = (val) => {
    return notes.filter((note) =>
      note.desc.toLowerCase().includes(val.toLowerCase())
    ).length;
  };

  return (
    <div>
      <div id="listCard">
        {notes
          .filter((note) =>
            note.desc.toLowerCase().includes(value.toLowerCase())
          )
          .map((note) => {
            return (
              <div
                onMouseEnter={() => {
                  showMore(note.id);
                }}
                onMouseLeave={hideMore}
                id={note.id}
                key={note.id}
                className={
                  (note.done || idDone === note.id
                    ? "border-slate-700 bg-slate-800"
                    : "border-slate-600 bg-slate-700") +
                  " my-2 w-full items-center justify-between rounded-lg border px-5 py-3 " +
                  (deleted.includes(note.id) ? "hidden" : "flex")
                }
              >
                <span
                  className={
                    (note.done || idDone === note.id ? "line-through" : "") +
                    " truncate"
                  }
                >
                  {note.desc}
                </span>
                <div className="ml-2 flex flex-row">
                  <div
                    className={
                      (more === note.id ? "flex " : "hidden ") +
                      " mr-2 border-r border-slate-500 pr-2"
                    }
                  >
                    {delLoad === note.id ? (
                      <div className="flex h-full w-8 items-center justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      <button
                        className="mr-1 flex h-full w-8 items-center justify-center  rounded-lg border border-slate-500 hover:border-slate-300"
                        onClick={() => {
                          deleteNote(note.id);
                        }}
                      >
                        <TrashIcon className="h-4 w-4 text-slate-300" />
                      </button>
                    )}

                    {note.done || idDone === note.id ? (
                      ""
                    ) : (
                      <Link
                        to={"note/" + note.id}
                        className="flex h-full w-8 items-center justify-center rounded-lg border border-slate-500 hover:border-slate-300"
                      >
                        <PencilIcon className="h-4 w-4 text-slate-300" />
                      </Link>
                    )}
                  </div>

                  {loading === note.id ? (
                    <div className="flex h-8 w-8 items-center justify-center">
                      <Spinner />
                    </div>
                  ) : note.done || idDone === note.id ? (
                    <div className="flex h-8 w-8 items-center justify-center border border-transparent">
                      <CheckIcon className="h-4 w-4 text-green-300" />
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setDone(note.id);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-500 hover:border-slate-300"
                    >
                      <CheckIcon className="h-4 w-4 text-slate-300" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {value.length > 0 && notes.length > 0 && totalSearch(value) < 1 ? (
        <NoMatch />
      ) : (
        ""
      )}

      {totalNote < 1 ? <NoData /> : ""}
    </div>
  );
};

export default Card;
