import { useReducer } from "react";

function reducer(currState,  action) {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {...currState, products: action.data}
        default:
            break;
    }
}

let init = {
    products : []
}



export function useCustomState() {
    const [val, dispatch] = useReducer(reducer, init)
    return [val, dispatch];
}