import React, { useEffect, useState } from "react";
//import { Switch, Route } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const HomePage = () => {
  const [details, setDetails] = useState({
    name: "",
  });
  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
  const addUser = () => {};
  const handleUpdate = () => {
    updateDoc(doc(db, "users", "LtPswOH4lmVerM9af4xO"), {
      ...details,
    });
  };

  return (
    <div>
      <input type="text" name="name" value={details.name} onChange={setValue} />
      <button onClick={handleUpdate}>Submit</button>
    </div>
  );
};

export default HomePage;
