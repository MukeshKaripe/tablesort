import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface typeData {
    category: string,
    description: string,
    id: number
    image: string,
    price: number,
    rating?: {
        count: number
        rate: number
    },
    quantity?:number
    title: string
};
interface cartItems{
    items:typeData[];
}

const initialState:cartItems = {
    items:[]
}
const ProductSlice = createSlice({
    name: 'getData',
    initialState,
    reducers:{
addToCart (state,action:PayloadAction<{id:number,quantity:number}>) {
    const {id,quantity} = action.payload;
  const QuantityData = (state.items).findIndex( item => item.id === id);
  if(QuantityData >= 0){
    // state.items[QuantityData].quantity += quantity;
  }
  else{
    state.items.push({
        id, quantity,
        category: "",
        description: "",
        image: "",
        price: 0,
        title: ""
    });
  }
}
    }
}) 
export const {addToCart} = ProductSlice.actions;
export default ProductSlice; 