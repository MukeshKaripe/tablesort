import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const Header = () =>{
const updateditem = useSelector((state:RootState) => state.productData.items)

    return (
        <>
        <div className="flex justify-around">
<div> <Link to={"/"}  > Home</Link> </div> <div  > <Link to={"/data"}  >Cart{updateditem.length}</Link></div>
        </div> 
        </>
    )
    }
    export default Header;