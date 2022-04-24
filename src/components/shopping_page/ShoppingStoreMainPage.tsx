import React, { useEffect, useReducer, useState } from "react";
import "./shopping-page.css";

import {
    CartItem,
    CheckoutCart,
    CheckoutCartItem,
    QuantityRecord,
    ShoppingStore,
} from "../../assets/types";
import { Button } from "@mui/material";
import { CartActions, CartState, CART_METHODS } from "./assets";
import { itemAdjustment } from "../../assets/utility/methods";
import { useQuery } from "react-query";
import { getProducts } from "../../assets/utility/fetching";
import { useDispatch } from "react-redux";
import {
    AppDispatch,
    REDUCER_ACTIONS,
} from "../../lighthouses/redux-lighthouse";
import CartItemCard from "./CartItemCard";
import Modal from "../flexible/Modal";
import CheckoutCartModalItem from "./CheckoutCartModalItem";

export default function cartReducer(
    state: CartState,
    { type, payload }: CartActions
): CartState {
    switch (type) {
        case CART_METHODS.ADD_ITEM:
        /**
         * Intentional fallthrough. Both ADD_ITEM and REMOVE_ITEM will
         * be handled by the one method below.
         */
        case CART_METHODS.REMOVE_ITEM:
            const { cartItem: currentItemAdd, shoppingStore } = payload;
            const prevItemAdd = state.quantityRecord[currentItemAdd.title];

            const recordAdd: QuantityRecord = {
                ...state.quantityRecord,
                [currentItemAdd.title]: {
                    /**@mightneedsomeBRACKETS */
                    // check if a previous value exists, add to it, otherwise add to 0
                    quantity:
                        (prevItemAdd?.quantity || 0) + itemAdjustment(type, 1),
                    total:
                        (prevItemAdd?.total || 0) +
                        itemAdjustment(type, currentItemAdd.price),
                },
            };

            const cart: CheckoutCart = Object.keys(recordAdd).reduce(
                (cart: CheckoutCart, title: CartItem["title"]) => {
                    if (recordAdd[title].quantity === 0) return cart;

                    return [
                        ...cart,
                        {
                            title,
                            quantity: recordAdd[title].quantity,
                            total: recordAdd[title].total,
                            price: shoppingStore[title].price,
                            image: shoppingStore[title].image,
                        },
                    ];
                },
                []
            );
            // console.log(cart);

            return {
                ...state,
                quantityRecord: recordAdd,
                cartTotal:
                    state.cartTotal +
                    itemAdjustment(type, currentItemAdd.price),
                checkoutCart: cart,
            };

        default:
            console.warn("unhandled action", type, "in cartReducer");
            return state;
    }
}

export function ShoppingStoreMainPage(): JSX.Element {
    const { data, isLoading, error } = useQuery<Array<CartItem>>(
        "products",
        getProducts
    );

    const dispatch = useDispatch<AppDispatch>();
    const [state, cartDispatch] = useReducer(cartReducer, {
        shoppingStore: [],
        quantityRecord: {},
        checkoutCart: [],
        cartTotal: 0,
    });

    useEffect(() => {
        if (!data) return;

        const shoppingStore: ShoppingStore = data.reduce(
            (store: ShoppingStore, item: CartItem): ShoppingStore => ({
                ...store,
                [item.title]: item,
            }),
            {}
        );

        dispatch({
            type: REDUCER_ACTIONS.SET_SHOPPING_STORE,
            payload: { shoppingStore },
        });
        // console.log(shoppingStore);
        // console.log(data)
    }, [data]);

    const [cartPortalOpen, setCartPortalOpen] = useState<boolean>(false);
    // useDebugInformation("state", state);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error.</div>;

    return (
        <div className="page-container">
            {/* <button onClick={() => console.log(shoppingStore)}>debugging (</button> */}

            <Button
                className="check-orders"
                onClick={() => setCartPortalOpen(true)}
            >
                Check orders
            </Button>

            <div className="shop-container">
                {data?.map((cartItem) => (
                    <CartItemCard
                        key={cartItem.id}
                        cartDispatch={cartDispatch}
                        cartItem={cartItem}
                    />
                ))}
            </div>

            {cartPortalOpen && (
                <Modal
                    open={cartPortalOpen}
                    onClose={() => setCartPortalOpen(false)}
                >
                    <div className="cart-modal">
                        <header>Your Shopping Cart</header>

                        {/* only show the items the user has added to the cart */}
                        {state.checkoutCart.map(
                            (cartItem: CheckoutCartItem): JSX.Element => (
                                <CheckoutCartModalItem
                                    key={cartItem.title}
                                    cartItem={cartItem}
                                    cartDispatch={cartDispatch}
                                />
                            )
                        )}

                        <footer>{state.cartTotal}</footer>
                    </div>
                </Modal>
            )}
        </div>
    );
}
