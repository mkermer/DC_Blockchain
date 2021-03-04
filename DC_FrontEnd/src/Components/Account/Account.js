import React, { useState, useEffect } from 'react'
import  { Button, Form, Alert, Card, ListGroup, Row, Col } from 'react-bootstrap'
import Transaction from './transaction_class';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/app.action';
import axios from 'axios';
import { io } from "socket.io-client";
import SHA256 from 'crypto-js/sha256';
import Moment from 'react-moment';



function Account(props) {

    const [balance, setBalance] = useState(props.applicationState.user.balance);

    const [toAddressInput, setToAddressInput] = useState("");
    const [amount, setAmount] = useState(0);
    const [fromAddressInput, setFromAddressInput] = useState(props.applicationState.user.publicKey);

    const [variant, setVariant] = useState("success");
    const [showSuccess, setShowSuccess] = useState(false);
    const [text, setText] = useState("");
    const [transactions, setTransaction] = useState([]);
    const [trig, setTrig] = useState(false)

    const [miningData, setMiningData] = useState(
        {
            merkleHash: '',
            blockID: 0,
            maxBlockID: 0,
            previousBlockHash: '',
            previousBlockNonce: 0,
            timestamp: 0,
            difficultyHash: '09'
        }
    )

    // Should contain data: userpublic key, hash, nonce
    const [foundHash, setFoundHash] = useState(
        {
            userPublicKey: '',
            hash: '',
            nonce: 0
        }
    )

    const signTransaction = async () => {
        try {
            const thisTransaction = {
                toAddress: toAddressInput,
                fromAddress: fromAddressInput,
                amount: amount

            }

            console.log(thisTransaction);
            const transres = await axios.post(`http://localhost:4000/blocks/update/${fromAddressInput}`, thisTransaction);
            console.log(transres.data);
            const trans = transres.data;
            setBalance(trans.balance);
            console.log(transactions)
            // window.location.reload()
        }
        catch (err) {
            console.log('Error: ' + err)
        }
    }

    const SERVER = "http://localhost:4000";
    const socket = io(SERVER);

    useEffect(() => {
        console.log('Interval')

        socket.on('connect', () => {
            console.log(`I'm connected with the back-end`);
        });

        // establish connection with the serversame header as Server
        socket.on("sendDataForMining", (arg) => {
            console.log(arg);
            setMiningData(arg)
        });

        socket.off('connect', () => {
            console.log(`I'm connected with the back-end`);
        });
    }, [])

    useEffect(() => {
        if (!!foundHash.hash && !!foundHash.userPublicKey) {
            console.log('Send Hash: ')
            console.log(foundHash)
            socket.emit("sendHash", foundHash);
            console.log('The hash was sent')
        }
    }, [foundHash])

    useEffect(() => {

        console.log(trig)
        if (trig) {
            console.log('Initiate mining...')
            //Perform calculaptions for the hash
            console.log('Mining Data: ')
            console.log(miningData)

            let nonce = 0;
            let control = 0;
            if (!!miningData.timestamp) {
                while (!control) {
                    const tHash = SHA256(
                        miningData.merkleHash
                        + miningData.blockID
                        + miningData.previousBlockHash
                        + miningData.previousBlockNonce
                        + miningData.timestamp
                        + nonce).toString();
                    if (miningData.difficultyHash > tHash) {
                        console.log(tHash)
                        console.log(miningData.difficultyHash > tHash)
                        console.log(nonce)
                        control = 1;

                        setFoundHash({
                            userPublicKey: fromAddressInput,
                            hash: tHash,
                            nonce: nonce
                        })
                    }
                    nonce += 1
                }
            }
            console.log('End mining...')
        }
    }, [miningData, trig])

    // MISSING:
    //   1 - Display the transaction history
    useEffect(() => {
        getTransactions();
    }, [setTransaction])

    const getTransactions = async () => {
        const response = await axios.get(`http://localhost:4000/users/getTransactions/${fromAddressInput}`)
        // console.log(response.data);
        setTransaction(response.data)
    }
    //   2 - Display balance by doing a http request that updates every 10-60 sec

    return (
        <div>
            <h1>Your balance: {balance}</h1>
            <Alert variant={variant} show={showSuccess}>
                {text}
            </Alert>

            <p>
                Your public Key:
            </p>
            <p>
                {fromAddressInput}
            </p>
            <Form>
                <Form.Group controlId="textarea">
                    <Form.Label>To address<span>*</span></Form.Label>
                    <Form.Control value={toAddressInput} onChange={(e) => setToAddressInput(e.target.value)} required />
                    <Form.Text className="text-muted">
                        The wallet address where you want to send the money to, <strong>enter only valid addresses!</strong>
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="textarea">
                    <Form.Label>Amount<span>*</span></Form.Label>
                    <Form.Control value={amount} onChange={(e) => setAmount(e.target.value)} required />
                    <Form.Text className="text-muted">
                        Amount of money, you would like to send!
                        </Form.Text>
                </Form.Group>
                <Button onClick={signTransaction}>Create transaction</Button>
            </Form>
            <br />
            <br />
            <h4>Minning</h4>
            <br />
            <h5>Options</h5>
            <Form>
                <Form.Group controlId="nonceOption">
                    <Form.Label>Starting value for the nonce:(needs to be implemnted all his option)<span>*</span></Form.Label>
                    <Form.Control placeholder='Need to think' value={0}
                        type="text" required />
                    <Form.Text className="text-muted">
                        Type a number to <strong>start mining</strong>
                    </Form.Text>
                </Form.Group>
                <Button >Random number</Button>
                <br />
                <br />
                <Button >Each iteration a random number</Button>
                <br />
                <br />
                <Button >Save options</Button>
            </Form>
            <br />
            <h5>Do you want to mine?</h5>
            <Button onClick={() => setTrig(!trig)} >Mine</Button>

            <h3>
                Your Transactions
            </h3>
            {transactions.map(transaction => {
                console.log(transaction.fromAddress)
                console.log(fromAddressInput)
            return(
            <Card style={{ width: '18rem' }}>
                <Card.Header>Your transactions </Card.Header>
                <ListGroup variant="flush">
                    <Row>
                        <Col>
                            <ListGroup.Item>
                                {transaction.fromAddress === fromAddressInput ? (
                                    <>
                                        <p>To: {transaction.toAddress}</p>
                                    
                                    </>
                                ) : (
                                    <p>From: {transaction.fromAddress}</p>
                                )}
                            </ListGroup.Item>
                        </Col>
                        <Col>
                            {/* <Moment> {transaction.timestamp} </Moment> */}
                            {transaction.timestamp}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Hash: {transaction.hash}</p>
                        </Col>
                        <Col>
                            <p> {transaction.amount} </p>
                        </Col>
                    </Row>
                </ListGroup>
            </Card>
            )})}
            
            {/* <table>
                <thead>
                    <tr>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Hash</th>
                        <th>Timestamp</th>

                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => {
                        return (
                            <tr>
                                <td>{transaction.toAddress}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.hash}</td>
                                <td>{transaction.timestamp}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>  */}
        </div>
    )
}

const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(Account);