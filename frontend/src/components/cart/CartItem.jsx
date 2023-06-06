import { useRecoilState } from "recoil";
import { cartAtom } from "../../store/atoms";
import QuantityUpdater from "./QuantityUpdater";

function CartItem({item}) {
    const [cart, setCart] = useRecoilState(cartAtom);

    function removeThisItem() {
        const  newArr = cart.cartProducts.filter(cp => cp.cpId !== item.cpId)
        setCart({...cart, cartProducts: newArr})
        /**
         * 1. First make API call to remove this product from cart
         * 2. fetch the cart for current user and then poulate the cart state value with the fetched value.
         */
    }

    function updateThisItem() {
        /**
         * 1. First make API call: Update Cart (which directly allows for updating the quantity)
         * 2. fetch the cart for current user and then poulate the cart state value with the fetched value.
         */
    }

    return (
        <>
            <div className="product-card">
                <div className="topline" style={{display: "flex"}}>
                    <div className="prod-name">{item.product.productName}</div>
                    <div>Price: Rs. {item.product.price}</div>
                    <div className="prod-price">x {item.quantity}</div>
                </div>
                <div className="prod-category">
                {item.product.category.categoryName}
                </div>
                <div className="topline" >
                    <button style={{color: "#f00"}} onClick={removeThisItem}>Remove Item</button>
                    <QuantityUpdater />
                </div>
            </div>
        </>
    );
}

export default CartItem;

// {
//     "cpId": 1,
//         "product": {
//         "productId": 2,
//             "productName": "Crocin pain relief tablet",
//                 "price": 10.0,
//                     "category": {
//             "categoryName": "Medicines"
//         }
//     },
//     "quantity": 2
// }