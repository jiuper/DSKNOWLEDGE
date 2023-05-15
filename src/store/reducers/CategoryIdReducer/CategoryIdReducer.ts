import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategoryId } from "../../../api/FetchCategoryId/FetchCategoryId";
import { IHeaderEditComponent } from "../../../types/type"


interface CatalogIdSliceType {
    categoryId: IHeaderEditComponent,
    isLoading: boolean,
    error: string,
    buttonName: string
}

const initialState: CatalogIdSliceType = {
    categoryId: {
        name: "",
        description: "",
        cntTest: null,
        imageUrl: "",
    },
    isLoading: false,
    error: "",
    buttonName: "",
}

export  const CategoryIdSlise = createSlice({
    name: "catalogId",
    initialState,
    reducers: {
        getButtonName(state, action: PayloadAction<string>) {
            state.buttonName = action.payload
        }
    },
    extraReducers: {
        [fetchCategoryId.fulfilled.type]: (state, action: PayloadAction<IHeaderEditComponent>) => {
            state.isLoading = false
            state.error = ""
            state.categoryId = action.payload
        },
        [fetchCategoryId.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchCategoryId.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    }

})

export const categoryIdAction = CategoryIdSlise.actions
export const categoryIdReducer = CategoryIdSlise.reducer
