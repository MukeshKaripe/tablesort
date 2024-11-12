import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getProduct } from "../../Api/Api";
import Header from "./Header";


const ShoppingCart = () => {
return(
    <>
   <Header/>
   <Outlet />
    </>
)
}
export default ShoppingCart;