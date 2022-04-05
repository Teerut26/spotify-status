import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDateInterface } from "../../interfaces/UserDataInterface";

export interface checkTokenInitialStateInterface {
    data: payloadSetDate
}

interface payloadSetDate {
    isLive: boolean | null | undefined,
    data: UserDateInterface | null | undefined
}

const checkTokenSlice = createSlice({
    name: "checkToken",
    initialState: {
        data: {
            isLive: undefined as boolean | null | undefined,
            data: undefined as UserDateInterface | null | undefined
        },
    },
    reducers: {
        setDate(state, actions: PayloadAction<payloadSetDate>) {
            state.data = actions.payload
        },
    },
});

export const checkTokenActions = checkTokenSlice.actions;

export default checkTokenSlice.reducer;