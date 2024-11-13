import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { addToCart } from "../../slices/ProductSlice";
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
    quantity:number
};
const CartData = () => {
    const [quantity,SetQuantity] = useState(1);
    const dispatch = useDispatch();
    const updateditem = useSelector((state: RootState) => state.productData.items);
    const listOfRequired = updateditem.map((item) => item.id)
    const data = localStorage.getItem('storedProductData');
    const findCartData = data ? JSON.parse(data) : [];
    // const listData = findCartData.filter((item: any) => listOfRequired.includes(item.id))
  
        const storeFIlterdata = updateditem.map((item)=>{
            const filteredDataVal = findCartData.find((p:any ) => p.id === item.id);
            return({
                ...filteredDataVal, quantity: item.quantity
            })
        }) ;
        const handleMinus = (id:number) => {
            dispatch(addToCart({id,quantity: quantity < 1 ? 1 : quantity - 1 }))
        }
        const handleAdd = (id:number) => {
            dispatch(addToCart({id,quantity: 1}))
        }

    useEffect(() => {
      
        console.log(findCartData);
    }, [updateditem])

    return (<>
        <ul>
            {
                storeFIlterdata.map((item: typeData, index: number) => {
                    return (<>
                        <li key={index}>
                            <div className="flex justify-center items-center gap-2" >
                                <div  ><img className="w-20 h-22" src={item.image} alt={item.title}></img></div>
                                <div  className="flex flex-col justify-center gap-1  ">
                                    <h6> {item.title}</h6>
                                    <div className="text-center" > <Button className="border-sky-100" onClick={()=> handleMinus(item.id) } >-</Button> {item.quantity} <Button className="border-sky-100" onClick={()=> handleAdd(item.id)}>+ </Button></div>
                                    <button className="rounded p-2 bg-slate-500 text-white" >$ {item.price}</button>
                                </div>
                                </div>
                        </li>
                    </>)
                })
            }
        </ul>
    </>)
}
export default CartData;