import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../lighthouses/redux-lighthouse";
import { CartItem, ShoppingStore } from "../../assets/types";
import { Button } from "@mui/material";
import { CartActions, CART_METHODS } from "./assets";

interface CartItemCardProps {
    cartDispatch: React.Dispatch<CartActions>;
    cartItem: CartItem;
}

export default function CartItemCard({
    cartDispatch,
    cartItem,
}: CartItemCardProps): JSX.Element {
    const { image, title, description, price } = cartItem;
    const shoppingStore = useSelector<RootState>(
        (state: RootState): ShoppingStore => state.shoppingStore
    ) as ShoppingStore;

    return (
        <div>
            <img src={image} alt="" />
            <div>{title}</div>
            <div>{description}</div>
            <div>{price}</div>

            <Button
                onClick={() =>
                    cartDispatch({
                        type: CART_METHODS.ADD_ITEM,
                        payload: { cartItem, shoppingStore },
                    })
                }
            >
                ADD TO CART
            </Button>
        </div>
    );
}
