import { IGenericErrorMessage } from "./error";

export type IGenericErrorResponse ={
    statusCode:number  
    message:string;
    errorMessage:IGenericErrorMessage[]
}

export type IUpdateReponse<T> = { 
    [  K in keyof T] : string | number
 }
export type IGenericDatabaseReponse<T> = { 
    [  K in keyof T] : string | number
 }
