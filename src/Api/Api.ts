import axios from "axios";

const api = axios.create({
    baseURL : `${process.env.REACT_APP_BASE_CURD}`
})
export const getData = () => {
   return api.get("/posts")
}
export const postData = () => {
    return api.post("/posts")
}
export const deleteData = (id:Number) => {
    return api.delete(`/posts/${id}`)
}