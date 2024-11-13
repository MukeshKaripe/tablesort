import { useEffect, useState } from "react";
import { getProduct } from "../../Api/Api";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/ProductSlice";
import { RootState } from "../../redux/store";

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
        try {
            const res = await getProduct();
        const data = res.data;
        console.log(data);
        setProductData(data);
        localStorage.setItem("storedProductData",JSON.stringify(data))
        // console.log(localStorage.setItem("storedProductData",JSON.stringify(data)));
        } catch (error) {
            console.log(error);
            
        }
        
    }
    const handleAddToCart = (id:number) => {
      dispatch(addToCart({id,quantity:1}));
      
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
                            <Button onClick={() => handleAddToCart(item.id)} >Add to Cart</Button>
                           </div>
                    );
                })
            }
        </div>

        </>
    );
}
export default ProductDetails;