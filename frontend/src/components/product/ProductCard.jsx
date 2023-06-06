import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartAtom, errorsAtom } from "../../store/atoms";
import {v4 as uuidv4} from 'uuid';
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";

function ProductCard({product}) {

    const [cart, setCart] = useRecoilState(cartAtom);
    const {fetch} = useAuthenticatedFetch()
    const seterror = useSetRecoilState(errorsAtom)

    async function addToCart() {
        // const newArr = [...cart.cartProducts, {cpId: uuidv4(), product, quantity :1}]
        // setCart({...cart, cartProducts: newArr})
        /**
         * 1. First make API call to add this product to cart
         * 2. fetch the cart for current user and then poulate the cart state value with the fetched value.
         */
        try {
            const addCartResult = await fetch("/cart", 'POST', {"productId": product.productId})
            let newCart = await fetch("/cart", 'GET')
            newCart = await newCart.json()
            setCart(newCart)
        } catch (error) {
            if(error.message.startsWith('409')) {
                seterror({message: 'Product Already added to cart!, To modify quantity go to cart!'})
            } else {
                console.log("Error in addToCart: " + error);
                seterror({message: error.message})
            }
            
        }
    }

    return (
        <>
            <div className="product-card">
                <div className="topline">
                    <div className="prod-name">{product.productName}</div>
                    <div className="prod-price">Rs. {product.price}</div>
                </div>
                <div className="prod-category">
                {product.category.categoryName}
                </div>
                <div className="topline">
                    <button onClick={addToCart}>Add To Cart</button>
                </div>
            </div>
            
        </>
    );
}

export default ProductCard;