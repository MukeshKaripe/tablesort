import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { addToCart, createSelectored, decrementQuantity } from "../../slices/ProductSlice";
import { Link } from "react-router-dom";
interface typeData {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating?: {
        count: number
        rate: number
    },
    title: string,
    quantity: number,
    totalPrice?: number
};
const CartData = () => {
    const dispatch = useDispatch();
    const updateditem = useSelector((state: RootState) => state.productData.items);
    const totlCartValue = useSelector(createSelectored);

    const data = localStorage.getItem('storedProductData');
    const findCartData = data ? JSON.parse(data) : [];
    // const listData = findCartData.filter((item: any) => listOfRequired.includes(item.id))
    const storeFIlterdata = updateditem.map((item) => {
        const filteredDataVal = findCartData.find((p: any) => p.id === item.id);
        return ({
            ...filteredDataVal, quantity: item.quantity, totalPrice: item.quantity * item.price
        })
    });
    const handleMinus = (id: number, price: number, quantity: number) => {
        // const updatedQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
        // console.log(updatedQuantity);

        dispatch(decrementQuantity({
            id, price, quantity: 0,
            totalPrice: 0
        }))
    }
    const handleAdd = (id: number, price: number, quantity: number) => {
        dispatch(addToCart({ id, quantity: 1, price, totalPrice: 0 }))
    }

    useEffect(() => {
        console.log(findCartData);
    }, [updateditem])

    return (<>
        {storeFIlterdata.length >= 1 ?
            <ul className="flex items-center flex-col mt-4">
                {
                    storeFIlterdata.map((item: typeData, index: number) => {
                        return (<>
                            <li className="w-[500px]" key={index}>
                                <div className={`flex justify-center items-center gap-2 pb-2 border-b-2  ${storeFIlterdata.length - 1 && index > 1 ? "border-b-0" : "border-red-100"} `}  >
                                    <div  ><img className="w-20 h-22" src={item.image} alt={item.title}></img></div>
                                    <div className="flex flex-col justify-center gap-1  ">
                                        <h6 className="w-[160px]" > {item.title}</h6>
                                        <div className="text-center" > <Button className="border-sky-100" onClick={() => handleMinus(item.id, item.price, item.quantity)} >-</Button> {item.quantity} <Button className="border-sky-100" onClick={() => handleAdd(item.id, item.price, item.quantity)}>+ </Button></div>
                                        <button className="rounded p-2 bg-slate-500 text-white" >$ {item.totalPrice}</button>
                                    </div>
                                </div>
                            </li>
                        </>)
                    })
                }
            </ul>
            : <div className="text-center">
                Please go <Link to={'/'}><Button>
                Home</Button> </Link> To shop
            </div>}
        <div className="flex justify-center p-6 border-sky-100">Totla Price:<span className="font-extrabold ml-3">{totlCartValue}</span></div>

    </>)
}
export default CartData;