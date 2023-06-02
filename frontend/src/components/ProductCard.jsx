function ProductCard({product}) {
    return ( 
        <>
            <div className="product-card">
                <div className="topline" style={{display: "flex"}}>
                    <div className="prod-name">{product.productName}</div>
                    <div className="prod-price">Rs. {product.price}</div>
                </div>
                <div className="prod-category">
                {product.category.categoryName}
                </div>
            </div>
            
        </>
    );
}

export default ProductCard;