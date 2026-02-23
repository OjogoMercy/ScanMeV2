import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

// track if the user is logged in or not and also to use anonymous signin unless triggered 
// so Mercy pls take note o 
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAnonymous,setIsAnynonymous] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u!){
        try {
          const result = await signInAnonymously(auth);
          setUser(result.user);
        } catch (err) {
          console.error("Anonymous auth failed", err);
        }
      }else{
        setUser(u);
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  return { user, loading,isAnonymous : user?.isAnonymous };
}