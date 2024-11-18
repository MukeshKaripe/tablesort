import { useEffect, useState } from "react";
import { getProduct } from "../../Api/Api";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/ProductSlice";
import { RootState } from "../../redux/store";
import { ThreeDots } from "react-loader-spinner";

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
    const handleAddToCart = (id:number,price:number) => {
      dispatch(addToCart({id,quantity:1,price,totalPrice:0}));
    };
    useEffect(() => {
        fetchProductsData();
    }, []);

    return (
        <>
    {productData.length > 1 ?     <div className="grid  grid-cols-4 gap-4 p-2">
            {
                productData.map((item: typeData , index) => {
                    return (
                           <div key={index} className="mb-2 shadow  hover:shadow-lg p-2 rounded" >
                           <div className="w-20 h-24  " >
                                <img className="h-full" src={item.image} alt={item.title} />
                            </div>
                            <h3 title={item.title} className="text-[16px] font-semibold line-clamp-1 cursor-pointer">{item.title}</h3>
                            <p className="line-clamp-3">{item.description}</p>
                            <h5>${item.price}</h5>
                            <Button onClick={() => handleAddToCart(item.id,item.price)} >Add to Cart</Button>
                           </div>
                    );
                })
            }
        </div> : <div className="flex justify-center h-[70vh] w-full items-center">
        <ThreeDots 
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
        </div>


        }

        </>
    );
}
export default ProductDetails;