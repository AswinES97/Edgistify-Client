import { toast } from "react-toastify";
import baseUrl from "./apiInterceptor";

const loadProducts = async (skip: number, count: number) => {
  const { data }: any = await baseUrl
    .get(`/products?skip=${skip}&&count=${count}`)
    .catch((err) => toast.error("Something went wrong"));
  return data;
};

export default loadProducts;
