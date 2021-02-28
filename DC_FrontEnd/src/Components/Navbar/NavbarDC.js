import React from 'react';
import { Navbar, Nav, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../Logo/DCoin1.svg';
import LogoText from '../../Logo/DCoinText.svg';
import './NavbarDC.css';
import { FaSignInAlt, FaUserPlus, FaUser } from 'react-icons/fa';
import {  } from 'react-icons/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/app.action';

function NavbarDC(props) {



    if (props.applicationState.user !== false) {
        return (
            
            <Navbar bg="dark" variant="dark" sticky="top" collapseOnSelect expand="md">
                
                {/* <Link to="/" className="navbar-brand">
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
            
                </Navbar.Collapse>

                
                <DropdownButton  id="dropdown-button-drop-left" drop="left" className="silver-background"  key="left" variant="light" title="User">
                

                    <Dropdown.Item href="/account">Account</Dropdown.Item>
                    <Dropdown.Item href="/">Dashboard</Dropdown.Item>
                    <Dropdown.Item href="/" style={{color:"red"}}>Logout</Dropdown.Item>
                </DropdownButton> */}

            </Navbar>
            
        )
    }else{

        //**************if not logged in**************

        return (
            
            <Navbar bg="dark" variant="dark" sticky="top">
                
                <a href="/">
                <img
                    src={Logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="DCoin Logo"
                    />  
                </a>
                
                
                
                {/* <img
                    src={LogoText}
                    height="50"
                    className="d-inline-block align-top"
                    alt="DCoin Text Logo"
                    onClick={navigate}
                    />
                 */}
                
{/* 
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

               
                    
                        <Link to="/registerKeys">
                            <Button variant="outline-light" className="button-text1">
                                <FaUserPlus/>
                            </Button>
                        </Link>

                        <Link to="/login">
                            <Button variant="outline-light" className="button-text2">
                                <FaSignInAlt/>
                            </Button>
                        </Link>
*/}

                
            </Navbar>
            
        )
    }
    
}

const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(NavbarDC);