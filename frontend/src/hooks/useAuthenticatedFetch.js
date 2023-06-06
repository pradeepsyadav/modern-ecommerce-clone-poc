import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms";
import { deleteAuthenticatedConsumer, getAuthenticatedConsumer, postAuthenticatedConsumer, putAuthenticatedConsumer } from "../util";
import { useEffect, useState } from "react";


const mappings = {
    'GET': getAuthenticatedConsumer,
    "POST": postAuthenticatedConsumer,
    "PUT": putAuthenticatedConsumer,
    'DELETE': deleteAuthenticatedConsumer
}

const bodiful = ['POST', 'PUT', 'DELETE']

export const useAuthenticatedFetch = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const user = useRecoilValue(userAtom)

    async function fetch(url, method, body) {

        if (!user) {
            throw new Error("Please Login to perform this action")
        }
        const jwt = user.jwtToken;
        let isBody = false;

        // for (let e in bodiful) {
        //     if (method === e)
        //         isBody = true
        // }

        isBody = bodiful.filter(met => met === method).length > 0;

        const res = await (mappings[method])(url, jwt, isBody ? body : undefined);

        
        if (res.status != 200)
            throw new Error(res.status + " " + res.statusText)
        // else {
        //     const js = await res.json()
        //     return js;
        // }
        return res
    }

    return { fetch };
}