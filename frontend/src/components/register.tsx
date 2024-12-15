import { FC, useState } from "react";
import { Button, Col, Container, Form as BootstrapForm, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import createUserDto from "../interfaces/createUserDto";
import { observer } from "mobx-react";
import { userStore } from "../stores/UserStore";
import { AxiosResponse } from "axios";
import { validationSchema, initialTouched, initialValues } from "../validation/register_validation";
const Register: FC = observer(() => {
    document.title = "Регистрация";
    const [errorResponse, setErrorResponse] = useState<string | null>(null);
    const navigation = useNavigate();

    const handleSubmit = async (values: createUserDto) => {
        try {
            const response: AxiosResponse = await userStore.create(values);
            switch (response.status) {
                case 201:
                    navigation('/auth');
                    break;
                case 400:
                    setErrorResponse('Пользователь с таким логином уже существует');
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <h1>Регистрация</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                initialTouched={initialTouched}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <BootstrapForm.Group>
                            <BootstrapForm.Label>Имя</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} name="name" placeholder="Введите ваше имя" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group>
                            <BootstrapForm.Label>Фамилия</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} name="surname" placeholder="Введите ваше фамилия" />
                            <ErrorMessage name="surname" component="div" className="text-danger" />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group>
                            <BootstrapForm.Label>Логин</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} name="login" placeholder="Введите ваш логин" />
                            <ErrorMessage name="login" component="div" className="text-danger" />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group>
                            <BootstrapForm.Label>Пароль</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="password" name="password" placeholder="Введите ваш пароль" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </BootstrapForm.Group>
                        <Row className="mt-2 gap-2">
                            <Col md={6}>
                                <Button variant="success" className="w-100" type="submit" disabled={isSubmitting}>Регистрация</Button>
                            </Col>
                            <Col>
                                <Button variant="danger" className="w-100" type="reset">Очистить</Button>
                            </Col>
                            <p>У вас уже есть своя учётная запись? <Link to="/auth">Войти</Link></p>
                        </Row>
                        {errorResponse && (<Alert variant="danger" className="mt-2">{errorResponse}</Alert>)}
                    </Form>
                )}
            </Formik>
        </Container>
    );
});

export default Register;