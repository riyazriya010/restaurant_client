import { USER_SERVICE_URL } from "../utils/constant";
import axiosInstance from "./axiosInstance";

const apiCalls = {
    async getAllRestaurants(): Promise<any> {
        try {
            const response = await axiosInstance.get(`${USER_SERVICE_URL}/getAll/restaurant`)
            return response
        } catch (error: any) {
            throw error
        }
    }
}
export default apiCalls
