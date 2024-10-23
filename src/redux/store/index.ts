import { configureStore } from "@reduxjs/toolkit";
import { getData } from "../../slices/tableSlice";



export const store = configureStore({
reducer:{
    getData: getData.reducer,
}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch