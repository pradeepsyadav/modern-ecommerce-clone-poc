export const API_ENDPOINT = 'http://localhost:8000/'


export async function getPublic(url, query=null) {
    // debugger
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


function getQueryString(queryObject = {}) {
    let res = "?"
    let keys = Object.keys(queryObject)
    keys.forEach((key, index) => {
        res = res.concat(`${key}=${queryObject[key]}`).concat(index === keys.length-1 ? '' : '&')
    })
    // for (let i = 0; i < keys.length; i++) {
    //     let key = keys[i];
    //     res = res.concat(`${key}=${queryObject[key]}`);//.concat((i === keys.length - 1 ? '' : '&'))
    //     if(i === keys.length - 1) {
    //         res = res.concat("");
    //     } else {
    //         res = res.concat("&");
    //     }
    // }
    return res;
}