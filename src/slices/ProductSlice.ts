import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface typeData {
    id: number,
    quantity:number,
};
interface cartItems{
    items:typeData[];
}

const initialState:cartItems = {
    items:[]
}
const ProductSlice = createSlice({
    name: 'productData',
    initialState,
    reducers:{
addToCart (state,action:PayloadAction<{id:number,quantity:number}>) {
    const {id,quantity} = action.payload;
    const existingItemIndex = state.items.findIndex(item => item.id === id);

    if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += quantity;
    } else {
        state.items.push({ id, quantity
         });
    }
},
updateQuantity (state,action:PayloadAction<{id:number,quantity:number}>){
    const {id,quantity} = action.payload;
    const item = state.items.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
    }

}
    }
}) 
export const {addToCart, updateQuantity} = ProductSlice.actions;
export default ProductSlice; 