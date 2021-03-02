import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/app.action';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {

            showSuccess: false,
            variant: "success",
            text: '',

            loginData: {
                walletName: "",
                privInput: ""
            }


        }

    }




    setPrivInput = (e) => {
        const loginData = { ...this.state.loginData };
        loginData.privInput = e.target.value;

        this.setState({
            loginData
        })
    }

    setWalletName = (e) => {
        const loginData = { ...this.state.loginData };
        loginData.walletName = e.target.value;

        this.setState({
            loginData
        })
    }

    authentication = async () => {



        try {
            const res = await axios.post('http://localhost:4000/login/login', this.state.loginData);
            const response = res.data;
            console.log(response.success)
            if (response.success === true) {
                this.props.actions.storeUserData(response.userData)
                this.props.history.push("/account")
            }

        } catch (err) {
            console.log('Error: ' + err)
        }

        console.log('hello world')

    }


    render() {

        return (
            <div>
                <Alert variant={this.state.variant} show={this.state.showSuccess}>
                    {this.state.text}
                </Alert>
                <Form>
                    <Form.Group controlId="textarea">
                        <Form.Label>Wallet Name<span>*</span></Form.Label>
                        <Form.Control value={this.state.walletName} onChange={this.setWalletName} required />
                        <Form.Text className="text-muted">
                            Place your message here, <strong>won't be shared with any third parties!</strong>
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="textarea">
                        <Form.Label>Privatekey<span>*</span></Form.Label>
                        <Form.Control value={this.state.privInput} onChange={this.setPrivInput} required />
                        <Form.Text className="text-muted">
                            Place your message here, <strong>won't be shared with any third parties!</strong>
                        </Form.Text>
                    </Form.Group>
                    <Button onClick={this.authentication}>
                        <Link to={this.state.to} value={false} >Log in</Link></Button>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(Login);
