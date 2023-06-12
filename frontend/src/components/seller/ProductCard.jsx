import { useSetRecoilState } from "recoil";
import { errorsAtom, productAtom } from "../../store/atoms";
import { useAuthenticatedSellerFetch } from "../../hooks/useAuthenticatedFetch";
import { Link } from "react-router-dom";

function ProductCard({product}) {

    // const [cart, setCart] = useRecoilState(cartAtom);
    const setProducts = useSetRecoilState(productAtom)
    const {fetch} = useAuthenticatedSellerFetch()
    const seterror = useSetRecoilState(errorsAtom)

    async function deleteProduct() {
        // const newArr = [...cart.cartProducts, {cpId: uuidv4(), product, quantity :1}]
        // setCart({...cart, cartProducts: newArr})
        /**
         * 1. First make API call to add this product to cart
         * 2. fetch the cart for current user and then poulate the cart state value with the fetched value.
         */
        try {
            const deleteProductResult = await fetch(`/product/${product.productId}`, 'DELETE')
        } catch (error) {
            if(error.message.startsWith('404')) {
                seterror({message: 'Product doesn\'t exist'})
            } else {
                console.log("Error in deleteProduct: " + error);
                seterror({message: error.message})
            }
        }

        try {
            let newProducts = await fetch("/product", 'GET')
            newProducts = await newProducts.json()
            setProducts(newProducts)
        } catch (error) {
            if(error.message.startsWith('404')) {
                seterror({message: 'You dont have any Products now!'})
            } else {
                console.log("Error in deleteProduct: " + error);
                seterror({message: error.message})
            }
            setProducts([])
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
                    <button style={{color: '#f00'}} onClick={deleteProduct}> Delete Product </button>
                    <Link to={`/seller/editProduct/${product.productId}`}><button> Edit Product </button></Link>
                </div>
            </div>
            
        </>
    );
}

export default ProductCard;