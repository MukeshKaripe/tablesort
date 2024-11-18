import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const Header = () =>{
const updateditem = useSelector((state:RootState) => state.productData.items)

    return (
        <>
        <div className="flex justify-around p-4 shadow mb-3">
<div> <Link to={"/"}  className="border-b-0 border-slate-50  p-3 hover:border-slate-500 hover:border-b-2 hover:text-blue "  > Home</Link> </div> <div  > <Link to={"/data"}  className="border-b-0 border-slate-50  p-3 focus:border-slate-500 focus:border-b-2 hover:text-blue " >Cart ({updateditem.length})</Link></div>
        </div> 
        </>
    )
    }
    export default Header;