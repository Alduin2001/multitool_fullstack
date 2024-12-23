import { RouterI } from "../interfaces/routerI";
import Home from "../components/home";
import Register from "../components/register";
import Profile from "../components/profile";
import Auth from "../components/auth";
import Documentation from "../components/documentation";
export const publicRoutes:RouterI[] = [
    {
        name:'Главная',
        path:'/',
        component:Home
    },
    {
        name:"Документация",
        path:"/documentation",
        component:Documentation
    }
];

export const authRoutes:RouterI[] = [
    {
        name:'Регистрация',
        path:'/register',
        component:Register
    },
    {
        name:'Аутентификация',
        path:'/auth',
        component:Auth
    }
]

export const privateRoutes:RouterI[] = [
    {
        name:'Профиль',
        path:'/profile',
        component:Profile
    },
    {
        name:'Добавить мем',
        path:'/',
        component:Home
    }
]