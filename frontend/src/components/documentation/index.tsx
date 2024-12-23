import { FC } from "react";
import { Col, Container, ListGroup, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from '../../styles/links.style.module.css';
const Documentation: FC = () => {
    document.title = "Документация";
    return (
        <Container fluid>
            <h1>Документация</h1>
            <Row>
                <Col md={2}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Link className={`${styles.doc_link}`} to="/">Основы</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link className={`${styles.doc_link}`} to="/">Операционные системы</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <Container fluid>
                        <h1>Hello</h1>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}
export default Documentation;