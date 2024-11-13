import { configureStore } from "@reduxjs/toolkit";
import { getData } from "../../slices/tableSlice";
import ProductSlice from "../../slices/ProductSlice";



export const store = configureStore({
reducer:{
    getData: getData.reducer,
    productData:ProductSlice.reducer,
}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch