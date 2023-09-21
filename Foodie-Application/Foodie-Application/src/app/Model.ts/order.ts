import { Cuisine } from "./cuisine"

export type Order={
    orderId?:number,
    price?:number,
    orderedItems?:Cuisine[]
}