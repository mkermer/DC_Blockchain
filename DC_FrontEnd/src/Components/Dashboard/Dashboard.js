import React, { useState, useEffect } from 'react'
import { Button, Card, ListGroup, Row, Col, Form } from 'react-bootstrap';
import './Dashboard.css'
import axios from 'axios';
import Cube from './Cube';
import Moment from 'react-moment';


const Dashboard = (props) => {
    const [blocks, setBlocks] = useState([]);


    useEffect(() => {
        getBlocks();
    }, [])

    const getBlocks = async () => {
        const response = await axios.get('http://localhost:4000/blocks/getBlocks');
        console.log(response.data);
        setBlocks(response.data);
    }



    return (
        <div className="Dashboard">
            
            <h1>Latest 5 Blocks on DC chain</h1>
            
                <h4>Select View:</h4>
                    <input type="radio" id="a" label="Front" name="side" />
                    <label for="a">Block</label>
                    <input type="radio" id="b" label="Front" name="side"/>
                    <label for="b">Hash</label>
                    <input type="radio" id="c" label="Front" name="side"/>
                    <label for="c">Hash of previous Block</label>
                    <input type="radio" id="d" label="Front" name="side"/>
                    <label for="d">Nonce</label>
                    <input type="radio" id="e" label="Front" name="side"/>
                    <label for="e">Timestamp</label>
                    <input type="radio" id="f" label="Front" name="side"/>
                    <label for="f">Bottom</label>

                <h4>Or:</h4>
                
                
            <Row>

            {blocks.map(block => {
                let contentFront =  <>
                                        <Row>
                                            <Col xs={12}>
                                                <p>Block</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <p className="value">{block.id}</p>
                                            </Col>
                                        </Row>
                                    </>;
                let contentRight =  <>
                                        <Row>
                                            <Col xs={12}>
                                                <p>Hash</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <p className="value">{block.hash}</p>
                                            </Col>
                                        </Row>
                                    </>;
                let contentBack =   <>
                                        <Row>
                                            <Col xs={12}>
                                                <p>Previous Hash</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <p className="value">{block.previousHash}</p>
                                            </Col>
                                        </Row>
                                    </>;
                
                let contentLeft =   <>
                                        <Row>
                                            <Col xs={12}>
                                                <p>Nonce</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <p className="value">{block.nonce}</p>
                                            </Col>
                                        </Row>
                                    </>;
                let contentTop =    <>
                                        <Row>
                                            <Col xs={12}>
                                                <p>Timestamp</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <p><Moment format="MMMM Do YYYY, HH:mm:ss">{block.timestamp}</Moment></p>
                                            </Col>
                                        </Row>
                                    </>;
                let contentBottom = <> <p>Hello</p> </>;
                
                return (
                    <>
                    
                        <Col md={6}>
                        <Cube 
                            front={contentFront}
                            right={contentRight}
                            back={contentBack}
                            left={contentLeft}
                            top={contentTop}
                            bottom={contentBottom}
                        />
                        
                        </Col>
                    
                    </>
                )
            })}
            </Row>

            
        

    

        </div>
    )
}


export default Dashboard;