export const API_ENDPOINT = 'http://localhost:8000/'
const CONSUMER_ROUTE = 'api/auth/consumer';
const SELLER_ROUTE = 'api/auth/seller';

let route;

const selection = {
    'CONSUMER': CONSUMER_ROUTE,
    'SELLER': SELLER_ROUTE
}

export const selectRoute = function(r) {
    if(Object.keys(selection).filter(k => r===k).length === 0) throw new Error('Invalid route selection !')
    route = selection[r];
}

export async function getPublic(url, query=null) {
    const Response = await fetch(API_ENDPOINT.concat('api/public').concat(url).concat(query !== null ? getQueryString(query) : ''), {
        method: "GET"
    })
    return Response
}

export async function postPublic(url, body) {
    const Response = await fetch(API_ENDPOINT.concat('api/public').concat(url), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(body)
    })
    return Response
}

export async function getAuthenticatedConsumer(url, token, query=null) {
    const Response = await fetch(API_ENDPOINT.concat(route).concat(url).concat(query !== null ? getQueryString(query) : ''), {
        method: "GET",
        headers: {
            "JWT": token
        }
    })
    return Response
}

export async function postAuthenticatedConsumer(url, token, body) {
    const Response = await fetch(API_ENDPOINT.concat(route).concat(url), {
        method: "POST",
        headers: {
            "JWT": token,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(body)
    })
    return Response
}

export async function putAuthenticatedConsumer(url, token, body) {
    const Response = await fetch(API_ENDPOINT.concat(route).concat(url), {
        method: "PUT",
        headers: {
            "JWT": token,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(body)
    })
    return Response
}

export async function deleteAuthenticatedConsumer(url, token, body) {
    const Response = await fetch(API_ENDPOINT.concat(route).concat(url), {
        method: "delete",
        headers: {
            "JWT": token,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(body)
    })
    return Response
}


function getQueryString(queryObject = {}) {
    let res = "?"
    let keys = Object.keys(queryObject)
    keys.forEach((key, index) => {
        res = res.concat(`${key}=${queryObject[key]}`).concat(index === keys.length-1 ? '' : '&')
    })
    return res;
}

export async function fetchData() {
    const res = await getPublic("/product/search", {keyword : ''})
    const js = await res.json()
    return js;
}