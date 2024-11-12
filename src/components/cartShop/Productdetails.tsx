import { useEffect, useState } from "react";
import { getProduct } from "../../Api/Api";
import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/ProductSlice";

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
    title: string
};

const ProductDetails = () => {
const dispatch = useDispatch();
    const [productData, setProductData] = useState<typeData[]>([]);
    async function fetchProductsData() {
        const res = await getProduct();
        const data = res.data;
        setProductData(data);
        console.log(data);


    }
    const handleAddToCart = (id:number) => {
        dispatch(addToCart({id,quantity:1}))
return (id)
    };
    useEffect(() => {
        fetchProductsData();
    }, []);

    return (
        <>
        <div className="grid  grid-cols-4 gap-4">

            {
                productData.map((item: typeData , index) => {
                    return (
                           <div key={index} className="mb-2" >
                           <div className="w-12 h-15  " >
                                <img src={item.image} alt={item.title} />
                            </div>
                            <h3>{item.title}</h3>
                            <p className="line-clamp-3">{item.description}</p>
                            <h5>${item.price}</h5>
                            <button onClick={() => handleAddToCart(item.id)} >Add to Cart</button>
                           </div>
                    );
                })
            }
        </div>

        </>
    );
}
export default ProductDetails;