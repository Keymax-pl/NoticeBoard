import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';


const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-5 mt-5 rounded">
      <Navbar.Brand as={NavLink} to="/" className="text-light" style={{ fontSize: '1.2rem', marginLeft: '10px' }}>Ads.app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" activeclassname="active">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/add" activeclassname="active">Add Ad</Nav.Link>
              <Nav.Link as={NavLink} to="/edit/:id" activeclassname="active">Ad Edit</Nav.Link>
              <Nav.Link as={NavLink} to="/logout" activeclassname="active">Sign out</Nav.Link>
              <Nav.Link as={NavLink} to="/login" activeclassname="active">login in</Nav.Link>
              <Nav.Link as={NavLink} to="/register" activeclassname="active">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;