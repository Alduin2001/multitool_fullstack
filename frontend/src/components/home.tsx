import { FC } from "react";
import { Button, Card, Carousel, Col, Container, Form, Image, Row } from "react-bootstrap";
import jason from '../assets/jason.jpg';
const Home:FC = ()=>{
    document.title = "Главная";
    
    return(
        <Container>
            <div>
                <h1>Добро пожаловать на главную страницу</h1>
                <p>Здесь вы найдёте информацию по использованию нашего современного ПО</p>
            </div>
            <Row className="gap-2">
                <Col md={3}>
                    <Card>
                        <Card.Header>Скорость</Card.Header>
                        <Card.Body>
                            <Card.Text>Мы гарантируем, что наше приложение будет работать быстрее всяких аналого</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card>
                        <Card.Header>Дизайн</Card.Header>
                        <Card.Body>
                            <Card.Text>Ни один аналог не имеет на столько стильный дизайн</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card>
                        <Card.Header>Увлечённость</Card.Header>
                        <Card.Body>
                            <Card.Text>Мы добавили туда то, что вызовит у вас радость</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Carousel>
                <Carousel.Item>
                    <Image src={jason}/>
                    <Carousel.Caption color="red">
                        <h1>Не скачать наше приложение - это как получить по е*балу. Становится неприятно</h1>
                        <p>Джэйсон Стэтем</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={jason}/>
                    <Carousel.Caption>
                        <h1>Не скачать наше приложение - это как получить пи*ды. Становится неприятно</h1>
                        <p>Джэйсон Стэтем</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Form className="mb-2">
                <Form.Group>
                    <Form.Label>Почта</Form.Label>
                    <Form.Control placeholder="Введите вашу почту"/>
                    <Form.Group className="mt-2">
                    <Button variant="success">Подписаться</Button>
                    </Form.Group>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Home;