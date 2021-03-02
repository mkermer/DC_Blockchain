import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import User from './class';
import BlockchainAPI from './BlockchainAPI';
import axios from 'axios';
import './CreateKeys.css';
import { Link } from 'react-router-dom';
class CreateKeys extends Component {

    constructor(props) {
        super(props)
        this.state = {
            publicKey: "",
            privateKey: "",
            showButton: false,
            showAlert: false,
            variant: "warning",
            balance: 100,
            walletName: ""

        }
        this.user = User;
        this.api = BlockchainAPI;
    }


    setWalletName = (e) => {
        const wallet = e.target.value;
        this.setState({
            walletName: wallet
        })
    }


    generateKeys = async () => {

        const EC = require('elliptic').ec;
        const ec = new EC('secp256k1');
        const key = ec.genKeyPair();
        setTimeout(async () => {
            this.setState({
                publicKey: key.getPublic('hex'),
                privateKey: key.getPrivate('hex'),
                showButton: true,
            })


        }, 100)



        // this.postUserData(user);

        //Post method

    }

    register = async () => {
        const user = {
            publicKey: this.state.publicKey,
            privateKey: this.state.privateKey,
            balance: this.state.balance,
            walletName: this.state.walletName
        }

        try {
            const response = await axios.post('http://localhost:4000/users/add', user);
            console.log(response.data);
        } catch (err) {
            console.log('Error: ' + err)
        }
    }

    render() {

        return (
            <div className="keys">
                <Alert variant={this.state.variant} show={this.state.showAlert}>
                    Your public and private Key are unique. Make sure to store it safely.<br />
                If you are losing one of them, you will never be able to access your account again!!!.
                </Alert>
                Register your WalletName:
                <Form.Group controlId="textarea">
                    <Form.Label>Wallet Name<span>*</span></Form.Label>
                    <Form.Control value={this.state.walletName} onChange={this.setWalletName} required />
                    <Form.Text className="text-muted">
                        Place your message here, <strong>won't be shared with any third parties!</strong>
                    </Form.Text>
                </Form.Group>
                <p>Your public key: {this.state.publicKey}</p>
                <p>Your private key: {this.state.privateKey}</p>
                <Button variant="outline-info"
                    onClick={this.generateKeys}
                    disabled={this.state.showButton}>
                    Generate Wallet
                </Button>
                <Button onClick={this.register}>
                    Register
                </Button>
                <Button variant="outline-info">
                    <Link to="/login" >Return to login</Link>
                </Button>
            </div>
        )
    }

}

export default CreateKeys; 