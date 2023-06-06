function Button({value, clickHandler}) {
    return (
        <button className="user" href='' onClick={clickHandler}>
            {value}
        </button>
    );
}

export default Button;