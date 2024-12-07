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
