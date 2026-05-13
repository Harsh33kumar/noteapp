import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: "paste",

  initialState,

  reducers: {
    addPaste: (state, action) => {
      state.pastes.push(action.payload);

      localStorage.setItem(
        "pastes",
        JSON.stringify(state.pastes)
      );

      toast.success("Paste created successfully!");
    },

    updatePaste: (state, action) => {
      const updatedPaste = action.payload;

      const index = state.pastes.findIndex(
        (p) => p.id === updatedPaste.id
      );

      if (index !== -1) {
        state.pastes[index] = updatedPaste;

        localStorage.setItem(
          "pastes",
          JSON.stringify(state.pastes)
        );

        toast.success("Paste updated successfully!");
      }
    },

    removePaste: (state, action) => {
      const pasteId = action.payload;

      state.pastes = state.pastes.filter(
        (p) => p.id !== pasteId
      );

      localStorage.setItem(
        "pastes",
        JSON.stringify(state.pastes)
      );

      toast.success("Paste removed successfully!");
    },

    resetAllPastes: (state) => {
      state.pastes = [];

      localStorage.removeItem("pastes");

      toast.success("All pastes reset successfully!");
    },
  },
});

export const {
  addPaste,
  updatePaste,
  removePaste,
  resetAllPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;