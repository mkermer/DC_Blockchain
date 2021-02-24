import React, { Component } from 'react'
import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../Logo/DCoin1.svg';
import LogoText from '../../Logo/DCoinText.svg';
import './NavbarDC.css';

class NavbarDC extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" sticky="top" collapseOnSelect expand="lg">
                <Link to="/" className="navbar-brand">
                    <img
                    src={Logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="DCoin Logo"
                    />  
                </Link>
                <Link to="/" className="navbar-brand">
                <img
                    src={LogoText}
                    height="50"
                    className="d-inline-block align-top"
                    alt="DCoin Text Logo"
                    />
                </Link>
                

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