import { auth } from "config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useUiStateStore } from "store/ui-state";

export default function useAuthListener() {
  const { userLoggedIn, setUserLoggedIn } = useUiStateStore();

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        !userLoggedIn && setUserLoggedIn(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUserLoggedIn(null);
      }
    });
    return () => listener();
    // eslint-disable-next-line
  }, [setUserLoggedIn]);

  return { userLoggedIn };
}
