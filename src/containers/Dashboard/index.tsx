import { useState } from "react";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { CDashboard, Layout } from "../../components";
import { db } from "../../firebase";
import { useGetSportsData } from "./queries";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/store";
import { setCurrentGuesses } from "../../slices/app";

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

  return (
    <Layout>
      <CDashboard
        data={data?.data}
        isLoading={getDataLoading}
        onAddGuess={onAddGuess}
        onRemoveGuess={onRemoveGuess}
        addGuessLoading={isLoading}
      />
    </Layout>
  );
}
