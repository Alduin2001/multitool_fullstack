import * as Yup from 'yup';
import createUserDto from '../interfaces/createUserDto';

export const initialValues: createUserDto = {
    name: '',
    surname: '',
    login: '',
    password: ''
};

export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Имя обязательно'),
    surname: Yup.string().required('Фамилия обязательна'),
    login: Yup.string().required('Логин обязателен'),
    password: Yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязателен'),
});

export const initialTouched = {
    name: true,
    surname: true,
    login: true,
    password: true,
};