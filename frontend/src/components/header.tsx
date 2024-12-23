import { FC } from "react";
import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { authRoutes, privateRoutes, publicRoutes } from "../config/routes";

import { userStore } from "../stores/UserStore";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
const Header: FC = observer(() => {
    const navigate = useNavigate();

    const logoutUser = async ()=>{
        await userStore.logout()
        .then(()=>navigate('/auth'));
    }
    return (
        <Navbar expand='lg' bg="success" variant="dark" className="p-2">
            <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="burger" />
            <Navbar.Collapse id="burger">
                <Nav className="ms-auto">
                    {/* Public */}
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-public">
                            Главная
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {publicRoutes.map((el, i) => (
                                <Dropdown.Item as={Link} to={el.path} key={i}>
                                    {el.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {
                        userStore.isAuth ? (<Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-private">
                                Личный кабинет
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {privateRoutes.map((el, i) => (
                                    <Dropdown.Item as={Link} to={el.path} key={i}>
                                        {el.name}
                                    </Dropdown.Item>
                                ))}
                                <Dropdown.Item>
                                    <Button variant="danger" onClick={logoutUser}>Выйти</Button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>) : (<Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-auth">
                                Аутентификация
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {authRoutes.map((el, i) => (
                                    <Dropdown.Item as={Link} to={el.path} key={i}>
                                        {el.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>)
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
});

export default Header;