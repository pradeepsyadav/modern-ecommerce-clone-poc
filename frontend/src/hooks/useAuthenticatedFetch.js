import { useRecoilState, useRecoilValue } from "recoil";
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
    const localUser = localStorage.getItem('consumer_jwt')
    return commonFunction(localUser);
}

export const useAuthenticatedSellerFetch = () => {
    selectRoute('SELLER')
    const localUser = localStorage.getItem('seller_jwt')
    return commonFunction(localUser);
}

function commonFunction(localUser) {
    const [user, setUser] = useRecoilState(userAtom);

    async function fetch(url, method, body) {

        if (!user 
            )
            // && !localUser
            // ) 
        {
            throw new Error("Please Login to perform this action");
        }

        let jwt;

        // if (localUser) {
        //     const umodel = JSON.parse(localUser)
        //     jwt = umodel.jwtToken;
        // }

        jwt = user.jwtToken;
        let isBody = false;

        isBody = bodiful.filter(met => met === method).length > 0;

        const res = await (mappings[method])(url, jwt, isBody ? body : undefined);

        if (res.status != 200)
            throw new Error(res.status + " " + res.statusText);

        return res;
    }

    return { fetch };
}
