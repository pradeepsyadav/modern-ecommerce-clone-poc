import SearchBox from "./SearchBox";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartAtom, errorsAtom, productAtom, userAtom, viewAtom } from "../store/atoms";
import Button from "./common/Button";
import { fetchData } from "../util";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import CartButton from "./CartButton";
import { useEffect } from "react";

function NavBar() {
    const [view, setView] = useRecoilState(viewAtom)
    const user = useRecoilValue(userAtom)
    const [cart, setter] = useRecoilState(cartAtom)
    const setProducts = useSetRecoilState(productAtom)
    const { fetch } = useAuthenticatedFetch()
    const [errors, setErrors] = useRecoilState(errorsAtom)

    useEffect(() => {
        if (!user) return;
        async function getCart() {
            try {
                let res = await fetch("/cart", 'GET')
                res = await res.json()
                setter(res)
                setErrors({message: ''})
            } catch (error) {
                setErrors({message: error.message})
            }
        }
        getCart()
    }, [user])

    function hadleLoginClick() {
        setView('LOGIN')
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
        const d = await fetchData();
        setProducts(d)
        setView('PRODUCT_VIEW');
    }

    return (
        <div className="wrap">
            <Button value={'Home'} clickHandler={handleHomeClick} />
            <SearchBox />
            {/* <Button value={user ? user.user.username : 'Cart'} clickHandler={handleCartView} /> */}
            <CartButton cart={cart} getUserCart={getUserCart} />
            <Button value={user ? user.user.username : 'Login'} clickHandler={hadleLoginClick} />

        </div>
    );


}

export default NavBar;