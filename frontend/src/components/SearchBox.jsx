import { useState } from 'react';
import '../styles/search.css'
import { getPublic } from '../util';
import { useCustomState } from '../store';

function SearchBox({ handleSetProduct }) {

    const [keyword, setKeyword] = useState('');
    // const [val, dispatch] = useCustomState()

    async function searchProduct() {
        let js;
        // const res = await getPublic('/product/search', { "keyword": keyword })
        // if (res.status === 200) {
        //     js = await res.json()
        //     console.log(js);
        // } else {
        //     console.log("Some error happened");
        // }
        // setter(js)
        // onView(true)
        handleSetProduct([
            {
                "productId": 1,
                "productName": "Apple iPad 10.2 8th Gen WiFi iOS Tablet",
                "price": 29190.0,
                "category": {
                    "categoryName": "Electronics"
                }
            },
            {
                "productId": 2,
                "productName": "Crocin pain relief tablet",
                "price": 10.0,
                "category": {
                    "categoryName": "Medicines"
                }
            }
        ])

    }
    return (
        <div className="search">
            <input type="text" className="searchTerm"
                placeholder="What are you looking for?"
                onChange={e => setKeyword(e.target.value)}
                value={keyword}
            />
            <button type="submit" className="searchButton" onClick={searchProduct}>
                <span className="fa fa-search">Search</span>
            </button>
        </div>
    );
}

export default SearchBox;