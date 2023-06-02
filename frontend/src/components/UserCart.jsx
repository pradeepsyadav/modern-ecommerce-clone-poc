import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function UserCart() {

    const [cart, setCart] = useState(null)

    useEffect(() => {
        setCart({
            "cartId": 1,
            "totalAmount": 20.0,
            "cartProducts": [
                {
                    "cpId": 1,
                    "product": {
                        "productId": 2,
                        "productName": "Crocin pain relief tablet",
                        "price": 10.0,
                        "category": {
                            "categoryName": "Medicines"
                        }
                    },
                    "quantity": 2
                }
            ]
        })
    }, [])

    return (
        <ul>
            {cartItems 
                ? cartItems.map(it => <li>{<ProductCard product={it}/>}</li>)
                : 'EMPTY CART !!!'}
        </ul>
    );
}

export default UserCart;