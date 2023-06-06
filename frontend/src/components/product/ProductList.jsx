import ProductCard from "./ProductCard";
import '../../styles/product.css'
import { useRecoilState, useRecoilValue } from "recoil";
import { productAtom } from "../../store/atoms";
import { useEffect } from "react";
import { getPublic } from "../../util";

function ProductList() {
    const [products, setProducts] = useRecoilState(productAtom)

    useEffect(() => {
        if (products) return;
        async function fetchData() {
            const res = await getPublic("/product/search", { keyword: '' })
            const js = await res.json()
            setProducts(js)
        }
        fetchData()
    }, [])

    function calculateRender() {
        if (!products) return null;
        else if (products.length === 0) return 'No Products found';
        else return products.map(p => <ProductCard key={p.productId} product={p} />)
    }

    return (
        <> {(products && products.length !== 0) && <div className="product-header">All Products</div>}
            <div className="product-container">
                {/* {products && products.map(p => <ProductCard key={p.productId} product={p} />)}
            {(products.length === 0) ? 'No Products found' : } */}
                {calculateRender()}
            </div>
        </>
    );
}

export default ProductList;