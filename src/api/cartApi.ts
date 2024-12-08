import baseUrl from "./apiInterceptor";

export const addToCart = async (productId: number, quantity: number) => {
  return await baseUrl.post("/cart", { productId, quantity });
};

export const cartData = async () => {
  return await baseUrl.get("/cart");
};
