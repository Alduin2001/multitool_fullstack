import { FC, useState } from "react";
import { Button, Col, Container, Form as BootstrapForm, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from "mobx-react";
import { userStore } from "../stores/UserStore";
import { AxiosResponse } from "axios";
import { initialValues, initialTouched,validationSchema } from "../validation/login_validation";
import loginUserDto from "../interfaces/loginUserDto";
const Auth: FC = observer(() => {
    document.title = "Аутентификация";
    const [errorResponse, setErrorResponse] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleSubmit = async (values: loginUserDto) => {
        try {
            const response: AxiosResponse = await userStore.login(values);
            switch(response.status){
                case 400:
                    setErrorResponse('Неправильно введён логин или пароль');
                break;
                default:
                    navigate('/profile');
                break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <h1>Аутентификация</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                initialTouched={initialTouched}
            >
                {({ isSubmitting }) => (
                    <Form>
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
                                <Button variant="success" className="w-100" type="submit" disabled={isSubmitting}>Войти</Button>
                            </Col>
                            <Col>
                                <Button variant="danger" className="w-100" type="reset">Очистить</Button>
                            </Col>
                            <p>Ещё не создали учётную запись? <Link to="/register">Создать</Link></p>
                        </Row>
                        {errorResponse && (<Alert variant="danger" className="mt-2">{errorResponse}</Alert>)}
                    </Form>
                )}
            </Formik>
        </Container>
    );
});

export default Auth;