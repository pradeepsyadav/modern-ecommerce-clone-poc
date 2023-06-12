import { atom } from "recoil";

export const counterAtom = atom({
    key: 'counter',
    default: 0
})

export const userAtom = atom({
    key: 'user',
    default: null
})

export const viewAtom = atom({
    key: 'view',
    default: "PRODUCT_VIEW"
})

export const productAtom = atom({
    key: 'products',
    default: null
})

export const cartAtom = atom({
    key: 'cart',
    default: null
})

export const errorsAtom = atom({
    key: 'errors',
    default: {
        message: ''
    }
})

function evaluateIfUserExistsLocally() {
    const us = localStorage.getItem('');
}