import { apiClient } from "../config/apiClient";
import createUserDto from "../interfaces/createUserDto";
import loginUserDto from "../interfaces/loginUserDto";

export default class UserAPI {
    static async create(createDto: createUserDto): Promise<any> {
        try {
            const response = await apiClient.post('user/register', createDto);
            return response;
        } catch (error) {
            return error;
        }
    }
    static async login(loginDto: loginUserDto): Promise<any> {
        try {
            const response = await apiClient.post('user/login', loginDto, {
                withCredentials: true
            });
            return response;
        } catch (error) {
            return error;
        }
    }
    static async profile(): Promise<any> {
        try {
            const response = await apiClient.get('user/profile',{
                withCredentials: true
            });
            return response;
        } catch (error) {
            return error;
        }
    }
}