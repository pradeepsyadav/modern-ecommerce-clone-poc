import { useRecoilState, useSetRecoilState } from "recoil";
import { cartAtom, errorsAtom } from "../../store/atoms";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { useState } from "react";

function CartItem({ item }) {

    const [cart, setCart] = useRecoilState(cartAtom);
    const { fetch } = useAuthenticatedFetch()
    const seterror = useSetRecoilState(errorsAtom)
    const [quantity, setQuantity] = useState(item.quantity)


    async function removeThisItem() {
        // const newArr = cart.cartProducts.filter(cp => cp.cpId !== item.cpId)
        // setCart({ ...cart, cartProducts: newArr })
        /**
         * 1. First make API call to remove this product from cart
         * 2. fetch the cart for current user and then poulate the cart state value with the fetched value.
         */
        try {
            const removeItemResult = await fetch("/cart", 'DELETE', { "productId": item.product.productId })
            let newCart = await fetch("/cart", 'GET')
            newCart = await newCart.json()
            setCart(newCart)
        } catch (error) {
            if (error.message.startsWith('409')) {
                seterror({ message: 'Product Already added to cart!, To modify quantity go to cart!' })
            } else {
                console.log("Error in addToCart: " + error);
                seterror({ message: error.message })
            }

        }
    }

    // {
    //     "product": {
    //         "productId": 2
    //     },
    //     "quantity": 4
    // }
    async function updateThisItem() {
        /**
         * 1. First make API call: Update Cart (which directly allows for updating the quantity)
         * 2. fetch the cart for current user and then poulate the cart state value with the fetched value.
         */
        try {
            const updateItemResult = await fetch("/cart", 'PUT', {
                "product": {
                    "productId": item.product.productId
                },
                "quantity": quantity
            })
            let newCart = await fetch("/cart", 'GET')
            newCart = await newCart.json()
            setCart(newCart)
        } catch (error) {
            if (error.message.startsWith('409')) {
                seterror({ message: 'Product Already added to cart!, To modify quantity go to cart!' })
            } else {
                console.log("Error in addToCart: " + error);
                seterror({ message: error.message })
            }

        }
    }

    return (
        <>
            <div className="product-card">
                <div className="topline" style={{ display: "flex" }}>
                    <div className="prod-name">{item.product.productName}</div>
                    <div>Price: Rs. {item.product.price}</div>
                    <div className="prod-price">x {item.quantity}</div>
                </div>
                <div className="prod-category">
                    {item.product.category.categoryName}
                </div>
                <div className="topline" >
                    <button style={{ color: "#f00" }} onClick={removeThisItem}>Remove Item</button>
                    <div className="quant-updater">
                        Update Quantity: {"   "}
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        {" "}
                        <span> {quantity} </span>
                        {" "}
                        <button onClick={() => setQuantity(quantity - 1)}>-</button>
                    </div>
                    
                </div>
                {(quantity>=0 && quantity !== item.quantity ) && <button onClick={updateThisItem}> Update Quantity </button>}
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