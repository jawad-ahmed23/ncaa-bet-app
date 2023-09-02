import { createSlice } from "@reduxjs/toolkit";

interface ICurrentUser {
  uid: string;
  email: string;
  name: string;
  currentGuesses: {
    team: string;
  }[];
  currentTotalsGuesses: {
    id: string;
    totals: string;
  }[];
}

const initialState: {
  currentUser: ICurrentUser | null;
} = {
  currentUser: null,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCurrentGuesses: (state, action) => {
      if (state.currentUser) {
        state.currentUser.currentGuesses = action.payload;
      }
    },
    setTotalsGuesses: (state, action) => {
      if (state.currentUser) {
        state.currentUser.currentTotalsGuesses = action.payload;
      }
    },
  },
});

export const { setCurrentUser, setCurrentGuesses, setTotalsGuesses } =
  appSlice.actions;

export default appSlice.reducer;
