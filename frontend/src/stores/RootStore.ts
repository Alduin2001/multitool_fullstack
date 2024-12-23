import { makeObservable } from "mobx";

export default class RootStore{
    public isAuth = false;
    public isAdmin = false;
    constructor(){
        makeObservable(this,{
            isAuth:false
        });
    }
    checkAdmin(status:number){
        if(status>=200 && status<=300){
            this.isAdmin = true;
        }
        else{
            this.isAdmin = false;
        }
    }
    checkAuth(status:number){
        if(status>=200 && status<=300){
            this.isAuth = true;
        }else{
            this.isAuth = false;
        }
    }
}