import { CART_METHODS } from "../../components/shopping_page/assets";

/**@General */
export function unionishArr<T>(arrA: Array<T>, arrB: Array<T>): boolean {
    /**
     * Check if the length of the arrays are the same and
     * if each element in the first array is in the second array.
     */
    return (
        sameArrLen(arrA, arrB) && arrA.every((item: T) => arrB.includes(item))
    );
}

export function sameArrLen<T>(arrA: Array<T>, arrB: Array<T>): boolean {
    return arrA.length === arrB.length;
}

export function sameishArr(
    arrA: Array<unknown>,
    arrB: Array<unknown>
): boolean {
    /**
     * Check if two arrays have the same values in the same order
     * with same amount of elements.
     */

    return (
        sameArrLen(arrA, arrB) &&
        arrA.every((val: unknown, i: number): boolean => arrB[i] === val)
    );
}

/**@ShoppingPage */
export function itemAdjustment(
    type: CART_METHODS.ADD_ITEM | CART_METHODS.REMOVE_ITEM,
    value: number
): number {
    /**
     * Depending on whether a cart item is added or removed,
     * the value will be a added or subtracted. This is used
     * in the cartReducer on ADD_ITEM or REMOVE_ITEM methods.
     */

    // ({
    //     [CART_METHODS.ADD_ITEM]: value,
    //     [CART_METHODS.REMOVE_ITEM]: -value,
    // }[type]);

    return type === CART_METHODS.ADD_ITEM ? value : -value;
}
