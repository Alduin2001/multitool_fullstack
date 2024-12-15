import { makeObservable } from "mobx";

export default class RootStore{
    public isAuth = false;
    constructor(){
        makeObservable(this,{
            isAuth:false
        });
    }
    checkAuth(status:number){
        if(status>=200 && status<=300){
            this.isAuth = true;
        }else{
            this.isAuth = false;
        }
    }
}