import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { userAtom, viewAtom } from "../store/atoms"
import SellerNavBar from "./SellerNavBar"
import ErrorBox from "./common/ErrorBox"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function SellerRender() {

    const [user, setUser] = useRecoilState(userAtom)
    const setView = useResetRecoilState(viewAtom)
    const navigate = useNavigate();

    useEffect(() => {
        // setView('LOGIN')
        function evaluateUser() {
            const  um = localStorage.getItem('seller_jwt')
            if(um) {
                setUser(JSON.parse(um))
                navigate('products')
            } else {
                navigate("login")
            }
        }
        // if(!user) navigate("login")
        evaluateUser()
    }, [])

    return (
        <>
            <SellerNavBar />
            <Outlet />
            {/* <ContentBox /> */}
            <ErrorBox />
        </>
    )
}

export default SellerRender;