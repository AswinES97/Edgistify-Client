import { Dispatch, SetStateAction } from "react";

export interface IFormData {
  fullname: string;
  password: string;
  email: string;
  confirmPassword?: string;
}

export interface IUserResponse {
  userId: string;
  fullname: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: number;
  stock: number;
  brand: string;
  images: [string];
  thumbnail: string;
}

export interface IPaginationProps {
  totalNumber: number;
  skipState: {
    skip: number;
    setSkip: Dispatch<SetStateAction<number>>;
  };
}
