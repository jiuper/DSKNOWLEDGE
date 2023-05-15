import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ImageSelectSliceType {
    id: string
}

const initialState: ImageSelectSliceType = {
    id: "",
}

const imageSelectSlice = createSlice({
    name: "ImageSelect",
    initialState,
    reducers: {
        type(state, action: PayloadAction<string>) {
            state.id = action.payload
        },
    }
})

export const imageSelectAction = imageSelectSlice.actions;
export const imageSelectReduser = imageSelectSlice.reducer;



