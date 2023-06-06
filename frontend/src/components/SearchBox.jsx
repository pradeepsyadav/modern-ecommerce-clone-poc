import { useState } from 'react';
import '../styles/search.css'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { productAtom, viewAtom } from '../store/atoms';
import { getPublic } from '../util';

function SearchBox() {

    const [keyword, setKeyword] = useState('');
    const setView = useSetRecoilState(viewAtom)
    const [products, setProducts] = useRecoilState(productAtom)

    async function searchProduct(e) {
        e.preventDefault();
        let js;
        const res = await getPublic('/product/search', { "keyword": keyword })
        if (res.status === 200) {
            js = await res.json()
            setProducts(js)
        } else {
            setProducts(null)
        }
        setView('PRODUCT_VIEW')
        setKeyword('')
        
    }
    return (

        <form onSubmit={searchProduct} className="search">
            <input type="text" className="searchTerm"
                placeholder="Search Products.."
                onChange={e => setKeyword(e.target.value)}
                value={keyword}
                required={true}
            />
            <button type="submit" className="searchButton">
                <span className="fa fa-search">Search</span>
            </button>
        </form>

    );
}

export default SearchBox;