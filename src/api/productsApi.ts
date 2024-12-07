import baseUrl from "./apiInterceptor";

const loadProducts = async (skip: number, count: number) => {
  const { data } = await baseUrl.get(`/products?skip=${skip}&&count=${count}`);
  return data;
};

export default loadProducts;
