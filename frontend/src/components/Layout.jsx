import { useState } from 'react';
import '../styles/search.css'
import { getPublic } from '../util';


function Layout({ children , prodView, prodList, user}) {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {val, onView} = prodView;
    const {prodL, setter} = prodList;

    

    function mock() {
        return [
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
        ]
    }

    
    return (
        <>
            
            {children}
            
        </>
    )
}

export default Layout;