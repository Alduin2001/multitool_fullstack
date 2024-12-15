import * as Yup from 'yup';
import loginUserDto from '../interfaces/loginUserDto';

export const initialValues: loginUserDto = {
    login: '',
    password: ''
};

export const validationSchema = Yup.object().shape({
    login: Yup.string().required('Логин обязателен'),
    password: Yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязателен'),
});

export const initialTouched = {
    login: true,
    password: true,
};