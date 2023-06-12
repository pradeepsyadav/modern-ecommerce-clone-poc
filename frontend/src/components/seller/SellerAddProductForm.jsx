import { useEffect, useState } from "react";
import { getPublic } from "../../util";
import { useAuthenticatedSellerFetch } from "../../hooks/useAuthenticatedFetch";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { errorsAtom, userAtom } from "../../store/atoms";
import { useNavigate } from "react-router-dom";

function SellerAddProductForm() {

    const [state, setState] = useState(null)
    const [categories, setCategories] = useState(null)
    const seterror = useSetRecoilState(errorsAtom)

    const {fetch} = useAuthenticatedSellerFetch()
    const navigate = useNavigate()

    const user = useRecoilValue(userAtom)

    useEffect(() => {
        if(!user) {
            navigate('/seller/login')
            return;
        }
        async function fetchCategories() {
            let res = await getPublic("/categories")
            res = await res.json()
            setCategories(res)
        }
        fetchCategories()
    }, [])

    function handleOnchange(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const payload = {
            "category": {
                "categoryName": state.category
            },
            "price": state.price,
            "productName": state.productName
        }
        try {
            const res = await fetch("/product", 'POST', payload)
            if(res.status !== 201) throw new Error("Some Error occured while adding Product")
            navigate('/seller/products')
        } catch (error) {
            if(!error.message.startsWith('201')){
                seterror({message: error.message})
                return;
            }
            navigate('/seller/products')
        }
        console.log(state);
    }

    return (
        <div className="product-container">
            <form action="" onSubmit={handleSubmit} onChange={handleOnchange}>

                <label htmlFor="" className="form-label">Product name</label>
                <input type="text" name="productName" id="" className="form-control" />

                <label htmlFor="" className="form-label">Category</label>
                <select className="form-select" aria-label="Default select example" name="category" >
                    <option selected> Select Category</option>
                    {categories && categories.map(cat => <option key={cat.categoryId} value={cat.categoryName}>{cat.categoryName}</option>)}
                </select>
                <label htmlFor="" className="form-label"> OR Enter a New Category</label>
                <input type="text" name="category" id="" className="form-control" />

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Price</label>
                    <input type="text" name="price" id="" className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default SellerAddProductForm;

/* 
    {
    "category": {
        "categoryName": "Electronics",
        "categoryId": 2
    },
    "price": "90000.0",
    "productName": "Samsung Fridge"
}
*/


/* To add send this payload {
    "category": {
        "categoryName": "Damba Damba mamba mamba"
    },
    "price": "90000.0",
    "productName": "Samsung Fridge"
} */