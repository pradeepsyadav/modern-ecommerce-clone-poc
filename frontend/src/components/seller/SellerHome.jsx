import { useRecoilValue } from "recoil";
import { userAtom } from "../../store/atoms";

function SellerHome() {
    const user = useRecoilValue(userAtom);
    return (
        <>
            This is Seller Home for person {JSON.stringify(user)}
        </>
    );
}

export default SellerHome;