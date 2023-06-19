import Card from "./Card";
import BtnAdd from "../partials/BtnAdd";
import { db } from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import NoData from "./NoData";
import HomeSkeleton from "../skeleton/HomeSkeleton";

const Home = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [x, setX] = useState(false);
  const notesCollectionRef = query(
    collection(db, "notes"),
    where("uid", "==", user.uid)
  );

  useEffect(() => {
    const getNotes = async () => {
      await getDocs(notesCollectionRef).then((x) => {
        setNotes(x.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setX(true);
      });
    };

    getNotes();
  }, []);

  if (x) {
    return (
      <div className="px-5 pb-10 pt-24 lg:px-44">
        {notes.length > 0 ? <Card notes={notes} /> : <NoData />}
        <BtnAdd />
      </div>
    );
  } else {
    return (
      <div className="px-5 pb-10 pt-24 lg:px-44">
        <HomeSkeleton />
      </div>
    );
  }
};

export default Home;
