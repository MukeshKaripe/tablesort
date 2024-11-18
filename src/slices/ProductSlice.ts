import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
interface typeData {
    id: number,
    quantity:number,
    price:number,
    totalPrice: number; 
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
    reducers: {
        addToCart(state, action: PayloadAction<{ id: number; quantity: number; price: number;totalPrice: number;  }>) {
            const { id, quantity, price } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id);

            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].quantity += quantity;
            } else {
                state.items.push({ id, quantity, price,totalPrice: quantity * price });
            }
        },
        updateQuantity(state, action: PayloadAction<{ id: number; quantity: number ;price:number; totalPrice:number }>) {
            const { id, quantity,price } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                item.totalPrice = quantity * price;
            }
        },
        decrementQuantity(state, action: PayloadAction<{ id: number;quantity: number ;price:number; totalPrice:number }>) {
            const { id, quantity,price } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                item.totalPrice = quantity * price;
            }
        }
    }
});

export const { addToCart, updateQuantity,decrementQuantity } = ProductSlice.actions;
export default ProductSlice.reducer;


export const createSelectored = createSelector(
(state: RootState) => state.productData.items,
(items) => items.reduce((total: number,item: { quantity: number; price: number; })=> total + item.quantity * item.price,0));