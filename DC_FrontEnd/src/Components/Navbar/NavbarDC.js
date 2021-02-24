import React, { Component } from 'react'
import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavbarDC extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" sticky="top" collapseOnSelect expand="lg">
                <Link to="/" className="navbar-brand">DC Blockchain</Link>

                <Nav className="mr-auto">
                    <Link to="/" className="navbar-brand">Home</Link>
                </Nav>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Form inline>
                        <Link to="/registerKeys">
                            <Button variant="outline-info">
                                Create Account
                            </Button>
                        </Link>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavbarDC; 