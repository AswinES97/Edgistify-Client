export interface IFormData{
    fullname: string
    password: string
    email: string
    confirmPassword?: string
}

export interface IUserResponse{
    userId: string,
    fullname: string
}