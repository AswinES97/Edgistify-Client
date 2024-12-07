import { IFormData } from "../types/types";
import baseUrl from "./apiInterceptor";

export const signupApi = async (formData: IFormData) => {
  const responseData = await baseUrl.post("/auth/signup", formData);
  return responseData.data;
};

export const signinApi = async (FormData: any) => {
  const responseData = await baseUrl.post("/auth/signin", FormData)
  return responseData.data
};
