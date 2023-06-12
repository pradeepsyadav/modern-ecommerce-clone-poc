import { useEffect, useState } from "react";
import { getPublic } from "../../util";
import { useAuthenticatedSellerFetch } from "../../hooks/useAuthenticatedFetch";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { errorsAtom, userAtom } from "../../store/atoms";
import { useNavigate, useParams } from "react-router-dom";

function SellerEditProductForm() {

    // const [state, setState] = useState(null)
    const [categories, setCategories] = useState(null)
    const seterror = useSetRecoilState(errorsAtom)
    const [retrieved, setRetrieved] = useState(null)

    const { fetch } = useAuthenticatedSellerFetch()
    const navigate = useNavigate()

    const params = useParams()

    const [name, setname] = useState(null)
    const [category, setcategory] = useState(null)
    const [price, setprice] = useState(null)
    const user = useRecoilValue(userAtom)

    const mapping = {
        'productName': setname,
        'category': setcategory,
        'price': setprice
    }

    useEffect(() => {
        if(!user) {
            navigate('/seller/login')
            return;
        }
        async function fetchProductData() {
            try {
                let res = await fetch(`/product/${params.productId}`, "GET")
                res = await res.json()
                setRetrieved(res)

                let res2 = await getPublic("/categories")
                res2 = await res2.json()
                setCategories(res2)

                setname(res.productName)
                setcategory(res.category.categoryName)
                setprice(res.price)

                console.log(category);
            } catch (error) {
                console.log(error);
                seterror({ message: error.message })
            }
        }
        fetchProductData()
        console.log(params);
    }, [params.productId])

    function handleOnchange(e) {
        // setState({ ...state, [e.target.name]: e.target.value })
        (mapping[e.target.name])(e.target.value)
    }


    /* 

    "productId": 9,
    "category": {
        "categoryName": "Electronics"
    },
    "price": "100000.0",
    "productName": "Smooth Coller"
}
    */
    async function handleSubmit(e) {
        e.preventDefault()
        const payload = {
            "productId": params.productId,
            "category": {
                "categoryName": category
            },
            "price": price,
            "productName": name
        }
        try {
            const res = await fetch("/product", 'PUT', payload)
            navigate('/seller/products')
        } catch (error) {
            seterror({ message: error.message })
        }
        
    }

    return (
        <div className="product-container">
            <form action="" onSubmit={handleSubmit} onChange={handleOnchange}>

                <label htmlFor="" className="form-label">Product name</label>
                <input type="text" name="productName" id="" className="form-control" value={name}/>

                <label htmlFor="" className="form-label">Category</label>
                <select className="form-select" aria-label="Default select example" name="category" value={category}>
                    <option> Select Category</option>
                    {categories && categories.map(cat => <option key={cat.categoryId} value={cat.categoryName}> {cat.categoryName} </option>)}
                </select>
                <label htmlFor="" className="form-label"> OR Enter a New Category</label>
                <input type="text" name="category" id="" className="form-control" />

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Price</label>
                    <input type="text" name="price" id="" className="form-control" value={price}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        </div>
    );
}

export default SellerEditProductForm;

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