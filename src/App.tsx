import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { Dashboard, Register, Signin, UserBets } from "./containers";
import "./App.css";
import { setCurrentUser } from "./slices/app";
import { doc, getDoc } from "firebase/firestore";
import { CSpinner } from "./components";
import Guard from "./components/Shared/Guard";

const routes = [
  {
    path: "/",
    Comp: Dashboard,
    guarded: true,
  },
  {
    path: "/signin",
    Comp: Signin,
    guarded: false,
  },
  {
    path: "/register",
    Comp: Register,
    guarded: false,
  },
  {
    path: "/user-bets",
    Comp: UserBets,
    guarded: false,
  },
];

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(userRef);

        const _user = docSnap.data();

        dispatch(
          setCurrentUser({
            uid: user.uid,
            ..._user,
          })
        );
      } else {
        console.log("user is logged out");
      }
    });

    () => {
      return unsubscribe();
    };
  }, []);

  return (
    <Routes>
      {routes.map((route, index) => {
        const comp = () => (
          <Suspense fallback={<CSpinner py="12" w="full" h="100vh" />}>
            <route.Comp />
          </Suspense>
        );
        return (
          <Route
            key={index}
            path={route.path}
            element={
              route.guarded ? (
                <Guard redirectTo="/signin">
                  <>{comp()}</>
                </Guard>
              ) : (
                comp()
              )
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
