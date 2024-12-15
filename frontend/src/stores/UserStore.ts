import UserAPI from "../api/UserApi";
import RootStore from "./RootStore";
import createUserDto from "../interfaces/createUserDto";
import { makeObservable, observable } from "mobx";
import loginUserDto from "../interfaces/loginUserDto";
import { AxiosResponse } from "axios";
class UserStore extends RootStore {

    constructor() {
        super();
        makeObservable(this,{
            isAuth:observable
        });
    }
    async create(createDto: createUserDto) {
        const response = await UserAPI.create(createDto);
        return response;
    }
    async login(loginDto: loginUserDto) {
        const response:AxiosResponse = await UserAPI.login(loginDto);
        return response;
    }
    async getProfile() {
        const response:AxiosResponse = await UserAPI.profile();
        this.checkAuth(response.status);
        return response
    }
}

export const userStore = new UserStore();
