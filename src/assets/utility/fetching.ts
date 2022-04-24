import { CartItem } from "../types";

export async function getProducts(): Promise<Array<CartItem>> {
    const response = await fetch("https://fakestoreapi.com/products");
    return response.json();
}
