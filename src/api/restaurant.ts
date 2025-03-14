import { USER_SERVICE_URL } from "../utils/constant";
import axiosInstance from "./axiosInstance";

const apiCalls = {

    async createRestaurant(data: any): Promise<any> {
        try{
            const response = await axiosInstance.post(`${USER_SERVICE_URL}/create/restaurant`,data)
            return response
        }catch(error: any){
            throw error
        }
    },

    async getAllRestaurants(): Promise<any> {
        try {
            const response = await axiosInstance.get(`${USER_SERVICE_URL}/getAll/restaurant`)
            return response
        } catch (error: any) {
            throw error
        }
    },

    async editRestaurant(id: string, data: any): Promise<any> {
        try{
            const response = await axiosInstance.patch(`${USER_SERVICE_URL}/update/restaurant?id=${id}`, data)
            return response
        }catch(error: any){
            throw error
        }
    },

    async deleteRestaurant(id: string): Promise<any>{
        try{
            const response = await axiosInstance.delete(`${USER_SERVICE_URL}/delete/restaurant?id=${id}`)
            return response
        }catch(error: any){
            throw error
        }
    }
}
export default apiCalls
