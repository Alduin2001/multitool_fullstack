import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { authRoutes, privateRoutes, publicRoutes } from "../config/routes";


const Main:FC = ()=>{

    return(
        <Routes>
            {publicRoutes.map((el,i)=><Route key={i} path={el.path} Component={el.component}/>)}
            {authRoutes.map((el,i)=><Route key={i} path={el.path} Component={el.component}/>)}
            {privateRoutes.map((el,i)=><Route key={i} path={el.path} Component={el.component}/>)}
        </Routes>
    )
}

export default Main;