import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : [],
}

const pasteSlice = createSlice({
    name: "paste",
    initialState,
    reducers: {
        addPaste: (state, action) => {
            const newPaste = {
                ...action.payload,
                _id: Date.now().toString(),
            };

            state.pastes.push(newPaste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success('Paste created successfully!');
        },
        updatePaste: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((p) => p._id === paste._id);
            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success('Paste updated successfully!');
            }
        },

        removePaste: (state, action) => {
            const pasteId = action.payload;
            const index = state.pastes.findIndex((p) => p._id === pasteId);
            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success('Paste removed successfully!');
            }
        },
        resetAllPastes: (state) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
            toast('All pastes reset successfully!');
        },
    },
});

export const { addPaste, updatePaste, removePaste, resetAllPastes } = pasteSlice.actions;
export default pasteSlice.reducer;