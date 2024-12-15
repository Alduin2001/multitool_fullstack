import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Main from './components/main';

function App() {

  return (
    <BrowserRouter>
      <Container fluid>
        <Header/>
        <Main/>
      </Container>
    </BrowserRouter>
  )
}

export default App
