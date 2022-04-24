export interface APICartItem {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { count: number; rate: number };
    title: string;
}

export interface CartItem extends APICartItem {}

export interface QuantityRecord {
    [key: CartItem["title"]]: {
        /**
         * Don't need to store price here since this will be used
         * since this will be used with a dispatch that will send
         * the price to the reducer.
         */

        quantity: number;
        total: number;
    };
}

export interface CheckoutCartItem
    extends Omit<
        CartItem,
        "id" | "description" | "category" | "description" | "rating"
    > {
    /**
     * Similar to Cart but extra information & array of items
     * instead of object since it will be displayed to the user
     * and `.map`'d over.
     */

    quantity: number;
    total: number;
}

export type CheckoutCart = Array<CheckoutCartItem>;

export interface ShoppingStore {
    [key: CartItem["title"]]: APICartItem;
}
