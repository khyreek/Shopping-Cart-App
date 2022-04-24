import { getProducts } from "../assets/utility/fetching";
import { itemAdjustment, unionishArr } from "../assets/utility/methods";

test("function", () => {
    expect(itemAdjustment(1, 10)).toBe(-10);
});

test("quick check for any api changed", async () => {
    const products = await getProducts();

    expect(
        unionishArr(Object.keys(products[0]), [
            "category",
            "description",
            "id",
            "image",
            "price",
            "rating",
            "title",
        ])
    ).toBe(true);
});
