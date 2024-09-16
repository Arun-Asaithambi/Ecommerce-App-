import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaAcquisitionsIncorporated } from "react-icons/fa";

function Header(){
    return (
        <Navbar expand="lg" className=" bg-secondary">
        <Container>
          <Navbar.Brand href="#home" className="fs-1 text-primary text"><FaAcquisitionsIncorporated />
          </Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          
            <Nav>
              <Nav.Link href="#home">Login</Nav.Link>
              <Nav.Link href="#link">Cart</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header;
