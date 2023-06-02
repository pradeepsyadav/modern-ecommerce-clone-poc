import { useState } from "react";
import SearchBox from "./SearchBox";

function NavBar({handleSetProduct, user, setShowLogin}) {
    // const [user, setUser] = useState('')
    
    function hadleLoginClick() {
        if(user) {
            // removeToken
        } else {
            //login
            setShowLogin(true)
        }
    }

    return ( 
        <div className="wrap">
            <SearchBox handleSetProduct={handleSetProduct}/>
            {<button className="user" href='' onClick={hadleLoginClick}>
                {user ? user.user.username : 'Login'}
            </button>}
        </div>
    );
}

export default NavBar;