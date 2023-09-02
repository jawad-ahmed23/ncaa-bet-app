import { useState } from "react";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { CDashboard, Layout } from "../../components";
import { db } from "../../firebase";
import { useGetSportsData } from "./queries";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/store";
import { setCurrentGuesses, setTotalsGuesses } from "../../slices/app";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.app);
  const { data, isLoading: getDataLoading } = useGetSportsData();

  const onAddGuess = async ({ team }: { team: string }) => {
    try {
      setIsLoading(true);
      const usersRef = collection(db, "users");

      if (currentUser) {
        const user = await getDoc(doc(usersRef, currentUser.uid));

        const userData = user.data();

        if (userData) {
          const { currentGuesses } = userData;

          if (!currentGuesses) {
            await updateDoc(doc(usersRef, currentUser.uid), {
              currentGuesses: [
                {
                  team,
                },
              ],
            });
            dispatch(
              setCurrentGuesses([
                {
                  team,
                },
              ])
            );
          } else {
            if (currentGuesses.length === 3) {
              console.log("max guesses limi exceed!");
              setIsLoading(false);
              return;
            }
            await updateDoc(doc(usersRef, currentUser.uid), {
              currentGuesses: [...currentGuesses, { team }],
            });
            dispatch(setCurrentGuesses([...currentGuesses, { team }]));
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("ADD GUESS ERROR", error);
    }
  };

  const onRemoveGuess = async ({ team }: { team: string }) => {
    try {
      setIsLoading(true);
      const usersRef = collection(db, "users");

      if (currentUser) {
        const user = await getDoc(doc(usersRef, currentUser.uid));

        const userData = user.data();

        if (userData) {
          const { currentGuesses } = userData;

          if (currentGuesses) {
            await updateDoc(doc(usersRef, currentUser.uid), {
              currentGuesses: currentGuesses.filter(
                (doc: { team: string }) => doc.team !== team
              ),
            });
            dispatch(
              setCurrentGuesses(
                currentGuesses.filter(
                  (doc: { team: string }) => doc.team !== team
                )
              )
            );
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("ADD GUESS ERROR", error);
    }
  };

  const onAddTotalsGuess = async ({
    id,
    totals,
  }: {
    id: string;
    totals: string;
  }) => {
    try {
      setIsLoading(true);
      const usersRef = collection(db, "users");

      if (currentUser) {
        const user = await getDoc(doc(usersRef, currentUser.uid));

        const userData = user.data();

        if (userData) {
          const { currentTotalsGuesses } = userData;

          if (!currentTotalsGuesses) {
            await updateDoc(doc(usersRef, currentUser.uid), {
              currentTotalsGuesses: [
                {
                  id,
                  totals,
                },
              ],
            });
            dispatch(
              setTotalsGuesses([
                {
                  id,
                  totals,
                },
              ])
            );
          } else {
            if (currentTotalsGuesses.length === 3) {
              console.log("max guesses limit exceed!");
              setIsLoading(false);
              return;
            }

            await updateDoc(doc(usersRef, currentUser.uid), {
              currentTotalsGuesses: [...currentTotalsGuesses, { id, totals }],
            });
            dispatch(
              setTotalsGuesses([...currentTotalsGuesses, { id, totals }])
            );
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("ADD TOTALS ERROR", error);
    }
  };

  const onRemoveTotalsGuess = async ({
    id,
    totals,
  }: {
    id: string;
    totals: string;
  }) => {
    try {
      console.log({ id, totals });

      setIsLoading(true);
      const usersRef = collection(db, "users");

      if (currentUser) {
        const user = await getDoc(doc(usersRef, currentUser.uid));

        const userData = user.data();

        if (userData) {
          const { currentTotalsGuesses } = userData;

          if (currentTotalsGuesses) {
            await updateDoc(doc(usersRef, currentUser.uid), {
              currentTotalsGuesses: currentTotalsGuesses.filter(
                (doc: { id: string; totals: string }) =>
                  doc.id !== id && doc.totals !== totals
              ),
            });

            dispatch(
              setTotalsGuesses(
                currentTotalsGuesses.filter(
                  (doc: { id: string; totals: string }) =>
                    doc.id !== id && doc.totals !== totals
                )
              )
            );
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("ADD GUESS ERROR", error);
    }
  };

  return (
    <Layout>
      <CDashboard
        data={data?.data}
        isLoading={getDataLoading}
        onAddGuess={onAddGuess}
        onRemoveGuess={onRemoveGuess}
        addGuessLoading={isLoading}
        onAddTotalsGuess={onAddTotalsGuess}
        onRemoveTotalsGuess={onRemoveTotalsGuess}
      />
    </Layout>
  );
}
