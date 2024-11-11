import { Link } from "react-router-dom";

const Header = () =>{
    return (
        <>
        <div className="flex justify-around">
<div> <Link to={"/"}  > Home</Link> </div> <div>Cart</div>
        </div> 
        </>
    )
    }
    export default Header;