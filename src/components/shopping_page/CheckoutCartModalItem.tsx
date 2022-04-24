import React from "react";
import { Button } from "@mui/material";
import { CheckoutCartItem, ShoppingStore } from "../../assets/types";
import { ReducerState, RootState } from "../../lighthouses/redux-lighthouse";
import { useSelector } from "react-redux";
import { CartActions, CART_METHODS } from "./assets";

interface CheckoutCartModalItemProps {
    cartItem: CheckoutCartItem;
    cartDispatch: React.Dispatch<CartActions>;
}

export default function CheckoutCartModalItem({
    cartItem,
    cartDispatch,
}: CheckoutCartModalItemProps): JSX.Element {
    const shoppingStore: ShoppingStore = useSelector<RootState>(
        (state: ReducerState): ShoppingStore => state.shoppingStore
    ) as ShoppingStore;
    // console.log(shoppingStore);

    return (
        <div key={cartItem.title} className="checkout-cart-item">
            <div className="checkout-cart-item-information">
                <div className="modal-item-title">{cartItem.title}</div>

                <div className="modal-item-pricing-info">
                    <div>Price: {cartItem.price}</div>
                    <div>Total: {cartItem.total}</div>
                </div>

                <div className="modal-item-quantity-section">
                    <Button
                        onClick={() =>
                            cartDispatch({
                                type: CART_METHODS.REMOVE_ITEM,
                                payload: {
                                    cartItem,
                                    shoppingStore,
                                },
                            })
                        }
                    >
                        -
                    </Button>

                    <div>{cartItem.quantity}</div>
                    <Button
                        onClick={() =>
                            cartDispatch({
                                type: CART_METHODS.ADD_ITEM,
                                payload: {
                                    cartItem,
                                    shoppingStore,
                                },
                            })
                        }
                    >
                        +
                    </Button>
                </div>
            </div>

            <img
                className="checkout-cart-image"
                src={cartItem.image}
                alt="image unavailable"
            />
        </div>
    );
}
