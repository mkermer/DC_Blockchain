import React, { Component } from 'react'
import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
class NavbarDC extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to="/" className="navbar-brand">DC Blockchain</Link>
                <Nav className="mr-auto">
                    <Link to="/" className="navbar-brand">Home</Link>
                </Nav>
                <Form inline>
                    <Button variant="outline-info">
                        <Link to="/registerKeys" >Create Account</Link>
                    </Button>

                </Form>
            </Navbar>
        )
    }
}

export default NavbarDC; 