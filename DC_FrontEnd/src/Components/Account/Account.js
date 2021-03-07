import React, { useState, useEffect } from 'react'
import  { Button, Form, Alert, Card, ListGroup, Row, Col, Accordion } from 'react-bootstrap'
import Transaction from './transaction_class';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/app.action';
import axios from 'axios';
import { io } from "socket.io-client";
import SHA256 from 'crypto-js/sha256';
import Moment from 'react-moment';
import './Account.css';
import Icon from '../../Logo/DCoinIconColor.svg';
// import Loading from './Loading';
import Copy from './Copy';
import Spinning from './Spinning'




function Account(props) {

    const [balance, setBalance] = useState(props.applicationState.user.balance);

    const [toAddressInput, setToAddressInput] = useState("");
    const [amount, setAmount] = useState(0);
    const [fromAddressInput, setFromAddressInput] = useState(props.applicationState.user.publicKey);
    const [wallet, setWallet] = useState(props.applicationState.user.walletName);
    const [rewardedUser, setRewardedUser] = useState("")
    const [variant, setVariant] = useState("success");
    const [showSuccess, setShowSuccess] = useState(false);
    const [text, setText] = useState("");
    const [variantTrans, setVariantTrans] = useState("success");
    const [showSuccessTrans, setShowSuccessTrans] = useState(false);
    const [textTrans, setTextTrans] = useState("");
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
                fromAdress: fromAddressInput,
                amount: amount

            }

            console.log(thisTransaction);
            const transres = await axios.post(`http://localhost:4000/blocks/update/${fromAddressInput}`, thisTransaction);
            console.log(transres.data);
            const trans = transres.data;
            if (trans !== 'The deposit address is not stored on our blockchain!') {
                const response = await axios.get(`http://localhost:4000/users/${props.applicationState.user._id}`);
                console.log(response.data);
                const user = response.data;
                props.actions.storeUserData(user);
                setBalance(user.balance);
                console.log(transactions)
                setShowSuccessTrans(true);
                setVariantTrans('success')
                setTextTrans('success your transaction has been send to ' + toAddressInput);
            } else {
                console.log('wrong');
                setShowSuccessTrans(true);
                setTextTrans(trans);
                setVariantTrans('warning')
            }

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

        socket.on('hi', (arg) => {
            console.log(arg);
            setRewardedUser(arg);
        })

        socket.on('miningSuccess', (arg) => {
            console.log(arg);
            setBalance(arg);

        })

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

        if (rewardedUser === fromAddressInput) {
            setText('You have successfully mined the block and get a reward of one DC-Coin')
            setVariant('success');
            setTimeout(() => {
                setText("");
                setRewardedUser('');
                setShowSuccess(false)
            }, 5000)
        } else if (rewardedUser !== fromAddressInput && rewardedUser !== '') {
            setText('Another user found the right hash')
            setTimeout(() => {
                setText("");
                setShowSuccess(false)
                setRewardedUser('');
            }, 5000)
        }


    })

    const mineBlock = () => {
        setTrig(!trig)
        setShowSuccess(true);
        setText('mine latest Block...');
        setVariant('warning');
    }

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

                        setTrig(false);
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
        <div className="Account">
            
            <Row>
                <Col xs={12} lg={4} className="AccoutCol" >
{/* *******************************************AccountCard********************************************** */}
                    <Card className="AccountCard">
                        <Card.Body>
                        
                            <Card.Subtitle className="mb-2 text-muted audiowide">{wallet}</Card.Subtitle>
                            <Card.Title className="gold audiowide"><img src={Icon} alt="DC"/>{balance} </Card.Title>
                            
                            <Alert variant={variantTrans} show={showSuccessTrans}>
                                {textTrans}
                            </Alert>

                            <br/>
                            <Accordion>
                                <Card>
                                    <Card.Header className="gold-background">
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        My Public Key
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <p className="KeyNumber">
                                            <Copy text={fromAddressInput} />
                                        </p>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Card.Body>
{/* *******************************************New Transaction********************************************** */}
                        <Accordion>
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle  as={Button} variant="link" eventKey="0">
                                    New Transaction
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>

                                    <Form>
                                        <Form.Group controlId="textarea">
                                            <Form.Label>To address<span>*</span></Form.Label>
                                            <Form.Control value={toAddressInput} onChange={(e) => setToAddressInput(e.target.value)} as="textarea" rows={6} required />
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
                                        <Button onClick={signTransaction}>Send!</Button>
                                    </Form>

                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>

                    </Card>

                </Col>

                <Col xs={12} lg={8} className="AccountRight">
{/* *******************************************Mining********************************************** */}
                    <Row className="MiningRow">
                        <Col className="AccoutCol">
                            <div className="Mining">
                                <h3>Mining</h3>
                                {/* <h5>Options</h5>
                                <Form>
                                    <Form.Group controlId="nonceOption">
                                        <Form.Label>Starting value for the nonce:(needs to be implemented all his option)<span>*</span></Form.Label>
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
                                <br /> */}
                                <br/>
                                <h5>How does mining work?</h5>
                                <br/>
                                    <p>
                                        Once a miner's computer figures out the correct answer, aka missing numbers, 
                                        a new block is created and added to the blockchain and the winner earns a block reward*. 
                                    </p>
                                    <p>  
                                        The reward is 1 DCoin and is immediatly added to your balance and shown in your transactions.
                                    </p>  
                                    <br/>
                                    <p> <i>*This is a competition, there is no guarantee that you win DCoins! </i></p>
                                <Alert variant={variant} show={showSuccess}>
                                    {text}
                                    {variant === "warning" ? <Spinning/> : null}
                                </Alert>
                                <Button onClick={mineBlock} >Start Mining!</Button>
                                </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="AccoutCol">
{/* *******************************************Transactions********************************************** */}
                            <div className="TransCards">
                                <h3 className="TransHeading">
                                    Your Transactions
                                </h3>

                                    {transactions.map(transaction => {
                                    return(
                                    <Card className="TransCard">
                                        {transaction.fromAdress === fromAddressInput ? (
                                            <Card.Header className="red">
                                                <Row className="header">
                                                    <Col md={10}>
                                                        <p className="KeyNumber">To: {transaction.toAddress}</p> 
                                                    </Col>
                                                    <Col md={2}>
                                                        <p><img src={Icon} alt="DC"/> {transaction.amount} </p>
                                                    </Col>
                                                </Row>
                                            </Card.Header>
                                        ) : (
                                            <Card.Header className="green">
                                                <Row className="header">
                                                    <Col md={10}>
                                                        <p className="KeyNumber">From: {transaction.fromAdress}</p>
                                                    </Col>
                                                    <Col md={2}>
                                                        <p><img src={Icon} alt="DC"/> {transaction.amount} </p>
                                                    </Col>
                                                </Row>
                                                
                                            </Card.Header>
                                        )}
                                        <ListGroup variant="flush">
                                            <Row>
                                                <Col md={6} className="TransCol">
                                                    <Moment format="MMMM Do YYYY, HH:mm">{transaction.timestamp}</Moment>
                                                </Col>
                                                <Col md={6}>
                                                    <p>Hash: {transaction.hash}</p>
                                                </Col>
                                            </Row>
                                        </ListGroup>
                                    </Card>
                                    )})}
                            </div>
                        </Col>
                    </Row>
                    
                    
                    
                
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(Account);