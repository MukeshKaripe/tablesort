import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Changed to HashRouter
import ShoppingCart from '../components/cartShop/ShoppingCart';
import Home from '../components/cartShop/Home';
import CartData from '../components/cartShop/CartData';

const AppRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<ShoppingCart />} >
                        <Route index   element={<Home />} />
                        <Route path="data"  element={<CartData />}  />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}
export default AppRoutes;