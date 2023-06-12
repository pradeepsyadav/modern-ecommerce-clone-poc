import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { errorsAtom, productAtom, userAtom } from "../../store/atoms";
import { useAuthenticatedSellerFetch } from '../../hooks/useAuthenticatedFetch'
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useRecoilState(productAtom)
    const { fetch } = useAuthenticatedSellerFetch()
    const setError = useSetRecoilState(errorsAtom)
    const user = useRecoilValue(userAtom)
    const navigate = useNavigate()

    useEffect(() => {
        // if (products) return;
        if(!user) {
            navigate('/seller/login')
            return;
        }
        async function fetchData() {
            try {
                const res = await fetch("/product", 'GET')
                const js = await res.json()
                setProducts(js)
            } catch (error) {
                if(error.message.startsWith('404')) {
                    setError({message: 'You dont have any Products now!'})
                } else {
                    console.log("Error in deleteProduct: " + error);
                    setError({message: error.message})
                }
            }
        }
        fetchData()
    }, [])

    function calculateRender() {
        if (!products) return "You don't have any products";
        else if (products.length === 0) return "You don't have any products";
        else return products.map(p => <ProductCard key={p.productId} product={p} />)
    }

    return (
        <> {(products && products.length !== 0) && <div className="product-header">Your Products</div>}
            <div className="product-container">
                {calculateRender()}
            </div>
        </>
    );
}

export default ProductList;