import axios from "axios";

interface payloadData{
    title:string,
    body:string,
    id?:number
}
interface key {
    body: string,
    id: number,
    title: string,
    userId: number
}

const api = axios.create({
    baseURL : `${process.env.REACT_APP_BASE_CURD}`
})
export const getData = () => {
   return api.get("/posts")
}
export const postDataApi = (payLoad:payloadData) => {
    return api.post("/posts",payLoad)
}
export const deleteData = (id:number) => {
    return api.delete(`/posts/${id}`)
}
export const updateDataApi = (id:number,payLoad:any) => {
    return api.put(`/posts/${id}`,payLoad)
}