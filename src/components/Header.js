import { Nav, Navbar, NavItem, Modal, Button, Form } from "react-bootstrap";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const username = useRef(null);

  const password = useRef(null);

  const remember = useRef(null);

  const [state, setState] = useState({ isModalOpen: false });

  const toggleModal = () => setState({ isModalOpen: !state.isModalOpen });

  function handleLogin(event) {
    toggleModal();
    alert(
      "Username: " +
        username.current.value +
        " Password: " +
        password.current.value +
        " Remember: " +
        remember.current.checked
    );
    event.preventDefault();
  }

  return (
    <div>
      <Navbar dark expand="md" className="navbar-dark">
        <div className="container">
          <Navbar.Brand className="mr-auto" href="/">
            <img
              src="assets/images/logo.png"
              height="30"
              width="41"
              alt="Ristorante Con Fusion"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse aria-controls="responsive-navbar-nav">
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  <span className="fa fa-home fa-lg"></span> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/aboutus">
                  <span className="fa fa-info fa-lg"></span> About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/menu">
                  <span className="fa fa-list fa-lg"></span> Menu
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/contactus">
                  <span className="fa fa-address-card fa-lg"></span> Contact Us
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <Button variant="outline-secondary" onClick={toggleModal}>
                  <span className="fa fa-sign-in fa-lg"></span> Login
                </Button>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
          {/* </Collapse> */}
        </div>
      </Navbar>
      <div className="jumbotron">
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Ristorante con Fusion</h1>
              <p>
                We take inspiration from the World's best cuisines, and create a
                unique fusion experience. Our lipsmacking creations will tickle
                your culinary senses!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal show={state.isModalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>username</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                ref={username}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>password</b>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                ref={password}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label="remember me"
                ref={remember}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
