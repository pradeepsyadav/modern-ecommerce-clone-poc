import SearchBox from "./SearchBox";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartAtom, errorsAtom, productAtom, userAtom, viewAtom } from "../store/atoms";
import Button from "./common/Button";
import { fetchData } from "../util";
import { useAuthenticatedFetch, useAuthenticatedSellerFetch } from "../hooks/useAuthenticatedFetch";
import CartButton from "./CartButton";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SellerNavBar() {
    const [view, setView] = useRecoilState(viewAtom)
    const user = useRecoilValue(userAtom)
    const [cart, setter] = useRecoilState(cartAtom)
    const setProducts = useSetRecoilState(productAtom)
    const { fetch } = useAuthenticatedSellerFetch()
    const [errors, setErrors] = useRecoilState(errorsAtom)
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user) return;
    //     async function getCart() {
    //         try {
    //             let res = await fetch("/cart", 'GET')
    //             res = await res.json()
    //             setter(res)
    //             setErrors({message: ''})
    //         } catch (error) {
    //             setErrors({message: error.message})
    //         }
    //     }
    //     getCart()
    // }, [user])

    function hadleLoginClick() {
        setView('LOGIN')
        navigate('login')
    }

    async function getUserCart() {
        try {
            let res = await fetch("/cart", 'GET')
            res = await res.json()
            setter(res)
            setErrors({message: ''})
            setView('CART')
        } catch (error) {
            console.log("Errorrrrrrrrrr at getUserCart" + error.message);
            setErrors({message: error.message})
        }
       
    }

    async function handleHomeClick() {
        // const d = await fetchData();
        // const res = await fetch("/product", "GET")
        // let js = await res.json()
        // setProducts(js)
        // setView('PRODUCT_VIEW');
        navigate('products')
    }

    function addProduct() {
        
    }

    return (
        <div className="wrap">
            <Link to={'products'}><Button value={'Your Products'}/></Link>
            <Link to={'addProduct'}><Button value={'Add Product'}/></Link>
            {/* <SearchBox /> */}
            {/* <Button value={user ? user.user.username : 'Cart'} clickHandler={handleCartView} /> */}
            {/* <CartButton cart={cart} getUserCart={getUserCart} /> */}
            <Button value={user ? user.user.username : 'Login'} clickHandler={hadleLoginClick} />

        </div>
    );


}

export default SellerNavBar;