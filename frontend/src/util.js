export const API_ENDPOINT = 'http://localhost:8000/'


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
    const Response = await fetch(API_ENDPOINT.concat('api/auth/consumer').concat(url).concat(query !== null ? getQueryString(query) : ''), {
        method: "GET",
        headers: {
            "JWT": token
        }
    })
    return Response
}

export async function postAuthenticatedConsumer(url, token, body) {
    const Response = await fetch(API_ENDPOINT.concat('api/auth/consumer').concat(url), {
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
    const Response = await fetch(API_ENDPOINT.concat('api/auth/consumer').concat(url), {
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
    const Response = await fetch(API_ENDPOINT.concat('api/auth/consumer').concat(url), {
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