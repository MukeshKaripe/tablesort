import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getProduct } from "../../Api/Api";
import Header from "./Header";


const ShoppingCart = () => {
    async function fetchProductsData () {
        const res = await getProduct();
        const data = res;
        console.log(data.data);
        
        
        }
        useEffect(()=>{
            fetchProductsData()
        },[])
return(
    <>
   <Header/>
   <Outlet />
    </>
)
}
export default ShoppingCart;