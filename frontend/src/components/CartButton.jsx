function CartButton({cart, getUserCart}) {
    return (
        <button className="user" href='' style={{ display: 'flex', alignItems: 'center' }} onClick={getUserCart}>
            <div style={{ padding: '5px' }}>Cart</div>
            {"  "}
            <div style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: '#000', color: '#fff', fontSize: '12px', padding: '9px' }}>
                {cart ? cart.cartProducts.length : 0}
            </div>
        </button>
    );
}

export default CartButton;