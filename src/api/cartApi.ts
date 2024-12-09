import baseUrl from "./apiInterceptor";

export const addToCart = async (productId: number, quantity: number) => {
  return await baseUrl.post("/cart", { productId, quantity });
};

export const cartData = async () => {
  const response = await baseUrl.get("/cart");
  return response.data;
};
