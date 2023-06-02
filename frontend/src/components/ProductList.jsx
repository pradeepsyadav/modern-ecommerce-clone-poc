import ProductCard from "./ProductCard";
import '../styles/product.css'
import { useEffect } from "react";

function ProductList({products}) {
    return ( 
        <div className="product-container">
            { products.map(p => <ProductCard key={p.productId} product={p}/>) } 
        </div>
    );
}

export default ProductList;