import { useRecoilState, useRecoilValue } from "recoil";
import { cartAtom, errorsAtom, userAtom } from "../../store/atoms";
import CartItem from "./CartItem";

function Cart() {

    const [cart, setCart] = useRecoilState(cartAtom)
    const user = useRecoilValue(userAtom)
    // const {cartError} = useRecoilValue(errorsAtom)

    // if (cartError) {
    //     return (<div className="product-container" style={{ textAlign: 'center', color: '#f00' }}>
    //         {cartError.message}
    //     </div>)
    // }

    if (!cart || cart.cartProducts.length === 0) return (
        <div className="product-header">
            Your Cart is Empty!
        </div>
    );
    return (
        <>
            <div className="product-header">
                {user.user.username}'s Cart
            </div>
            <div className="product-container">
                {cart.cartProducts.map(citem => <CartItem key={citem.cpId} item={citem} />)}
            </div>
            <div className="total">Total amount: {cart.totalAmount}</div>
        </>
    );
}

export default Cart;