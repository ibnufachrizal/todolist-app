import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/partials/Navbar";
import Home from "./components/home/Home";
import Note from "./components/note/Note";
import Signin from "./components/auth/Signin";
import NotFound from "./NotFound";
import firebase from "./services/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <BrowserRouter>
        <Navbar user={user} />
        {user === null ? (
          <Routes>
            <Route index path="/" element={<Signin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route index path="/" element={<Home user={user} />} />
            <Route path="note" element={<Note user={user} />} />
            <Route path="note/:id" element={<Note user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
