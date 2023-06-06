import { useRecoilState, useRecoilValue } from "recoil";
import { cartAtom, errorsAtom } from "../../store/atoms";
import CartItem from "./CartItem";

function Cart() {
    
    const [cart, setCart] = useRecoilState(cartAtom)
    // const {cartError} = useRecoilValue(errorsAtom)

    // if (cartError) {
    //     return (<div className="product-container" style={{ textAlign: 'center', color: '#f00' }}>
    //         {cartError.message}
    //     </div>)
    // }

    if (!cart || cart.cartProducts.length === 0) return (
        <div className="product-container">
            Your Cart is Empty!
        </div>
    );
    return (
        <div className="product-container">
            {cart.cartProducts.map(citem => <CartItem key={citem.cpId} item={citem} />)}
            <div className="total">Total amount: {cart.totalAmount}</div>
        </div>
    );
}

export default Cart;