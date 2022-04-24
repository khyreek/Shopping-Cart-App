import React from "react";
import {
    APICartItem,
    CartItem,
    CheckoutCart,
    ShoppingStore,
    CheckoutCartItem,
    QuantityRecord,
} from "../../assets/types";

export enum CART_METHODS {
    ADD_ITEM,
    REMOVE_ITEM,
    for_debugging, // ignore this
}

export interface CartState {
    shoppingStore: Array<APICartItem>;
    quantityRecord: QuantityRecord;

    // these are the items that the user will see in their cart
    checkoutCart: CheckoutCart;
    cartTotal: number;
}

export type CartActions =
    | { type: CART_METHODS.for_debugging; payload: any }
    //
    | {
          type: CART_METHODS.ADD_ITEM;
          payload: {
              cartItem: CartItem | CheckoutCartItem;
              shoppingStore: ShoppingStore;
          };
      }
    //
    | {
          type: CART_METHODS.REMOVE_ITEM;
          /**
           * This payload will not ever be called before the ADD_ITEM in which
           * cartItem could also be a CartItem in some cases, thus this is restricted
           * to only CheckoutCartItem.
           */
          payload: { cartItem: CheckoutCartItem; shoppingStore: ShoppingStore };
      };
