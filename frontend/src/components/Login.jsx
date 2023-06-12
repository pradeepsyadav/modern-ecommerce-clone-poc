import { useState } from 'react';
import '../styles/login.css'
import { getPublic, postPublic } from '../util';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartAtom, errorsAtom, userAtom, viewAtom } from '../store/atoms';
import { useNavigate } from "react-router-dom";


function Login(props) {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const [userVal, setuserVal] = useRecoilState(userAtom)
    const setView = useSetRecoilState(viewAtom)
    const [cart, setter] = useRecoilState(cartAtom)
    const [errors, setErrors] = useRecoilState(errorsAtom)
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault()
        try {
            const resp = await postPublic('/login', {
                "username": user,
                "password": pass
            });
            if(resp.status !== 200) throw new Error("Invalid username and password combination!")
            const userModel = await resp.json()
            setuserVal(userModel)
            // setView('PRODUCT_VIEW')
            const isSeller = userModel.user.roles[0] === "SELLER"
            localStorage.setItem( isSeller ? "seller_jwt" : "consumer_jwt", JSON.stringify(userModel) )
            navigate(isSeller ? "/seller/products" : "/consumer")
        } catch (error) {
            console.log(error.message);
            setErrors({message: error.message})
        }
    }

    // {
    //     "jwtToken": "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODU2MzUxMTUsInN1YiI6ImJvYiIsImlzcyI6InNwcmluZy13ZWIifQ.D5Br9SnXSK0yVduv_L5RxzziiL1HX2fygPptK59IWt4",
    //     "user": {
    //         "userId": 2,
    //         "username": "bob",
    //         "password": "pass_word",
    //         "roles": [
    //             "CONSUMER"
    //         ],
    //         "enabled": true,
    //         "authorities": [
    //             {
    //                 "authority": "CONSUMER"
    //             }
    //         ],
    //         "accountNonExpired": true,
    //         "accountNonLocked": true,
    //         "credentialsNonExpired": true
    //     }
    // }
    return (
        <>
            <div className="main">
                <p className="sign" align="center">Sign in</p>
                <form className="form1">
                    <input className="un" type="text" align="center" placeholder="Username" onChange={e => setUser(e.target.value)}/>
                    <input className="pass" type="password" align="center" placeholder="Password" onChange={e => setPass(e.target.value)}/>
                    <button type='Submit' className="submit" align="center" onClick={login}>Sign in</button>
                    <p className="forgot" align="center"><a href="#">Forgot Password?</a></p>
                </form>
            </div>
        </>
    )
}

export default Login;