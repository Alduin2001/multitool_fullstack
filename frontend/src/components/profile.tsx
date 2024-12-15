import { FC, useEffect,useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { observer } from "mobx-react";
import { userStore } from "../stores/UserStore";

const Profile:FC = observer(()=>{
    const [user,setUser] = useState<{name:string,surname:string,login:string}>({
        name:'',
        surname:'',
        login:''
    });
    useEffect(()=>{
        document.title = "Профиль";
        async function fetchUser(){
            await userStore.getProfile()
            .then(res=>setUser(res.data));
        }
        fetchUser();
        console.log(userStore.isAuth);
    },[]);
    return(
        <Container>
            <h1>Профиль</h1>
            {userStore.isAuth ? (
                <Form>
                <Form.Group>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control value={user.name}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control value={user.surname}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control value={user.login}/>
                </Form.Group>
                <Row className="mt-2">
                    <Col md={6}>
                        <Button variant="primary" className="w-100">Поменять</Button>
                    </Col>
                    <Col md={6}>
                        <Button variant="danger" className="w-100">Удалить</Button>
                    </Col>
                </Row>
            </Form>
            ):(
                <Alert variant="danger">Доступ запрещён</Alert>
            )}
        </Container>
    )
})
export default Profile;