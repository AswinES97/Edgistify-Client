import baseUrl from "./apiInterceptor";

export const placeOrder = async () => {
  const response = await baseUrl.post("/order");
  return response.data;
};
