import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "./firebase";


export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState("INIT");
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged(async (fbUser) => {
      if (fbUser == null) {
        console.log(fbUser);
        // history.push("/");
        return;
      }
      const docRef = doc(db, "users", fbUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let docData = docSnap.data();
        setUser({
          ...fbUser,
          userDetails: { uid: docSnap.id, ...docData },
        });
      } else {
        // doc.data() will be undefined in this case
        setUser(fbUser);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
