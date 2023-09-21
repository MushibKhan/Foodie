import { Restaurant } from "./restaurant"

export type Vendor = {
    emailId?:string,
    name?:string,
    password?:string,
    confirmPassword?:string,
    typeOfUser?:string,
    restaurant?:Restaurant,
    image?:string
}