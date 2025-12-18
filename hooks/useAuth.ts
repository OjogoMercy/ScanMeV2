import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        await signInAnonymously(auth);
      } else {
        setUser(u);
        setLoading(false);
      }
    });

    return unsub;
  }, []);

  return { user, loading };
}
