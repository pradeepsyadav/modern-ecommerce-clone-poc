import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms";
import { deleteAuthenticatedConsumer, getAuthenticatedConsumer, postAuthenticatedConsumer, putAuthenticatedConsumer, selectRoute } from "../util";


const mappings = {
    'GET': getAuthenticatedConsumer,
    "POST": postAuthenticatedConsumer,
    "PUT": putAuthenticatedConsumer,
    'DELETE': deleteAuthenticatedConsumer
}

const bodiful = ['POST', 'PUT', 'DELETE']

export const useAuthenticatedFetch = () => {
    selectRoute('CONSUMER')
    return commonFunction();
}

export const useAuthenticatedSellerFetch = () => {
    selectRoute('SELLER')
    return commonFunction();
}

function commonFunction() {
    const user = useRecoilValue(userAtom);

    async function fetch(url, method, body) {

        if (!user) {
            throw new Error("Please Login to perform this action");
        }
        const jwt = user.jwtToken;
        let isBody = false;

        isBody = bodiful.filter(met => met === method).length > 0;

        const res = await (mappings[method])(url, jwt, isBody ? body : undefined);

        if (res.status != 200)
            throw new Error(res.status + " " + res.statusText);

        return res;
    }

    return { fetch };
}
