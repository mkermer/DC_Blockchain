import React, { useState, useEffect } from 'react'
import { Button, Card, ListGroup, Row, Col } from 'react-bootstrap';
import './Dashboard.css'
import axios from 'axios';
import Cube from './Cube';


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
        <div>
            
            <h1>Blocks on DC chain</h1>
            <p> The latest 5 blocks on the chain: </p>
            {blocks.map(block => {
                let contentFront =  <>
                                        <Row>
                                            <Col xs={12}>
                                                <p>Block</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <p>{block.id}</p>
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
                                                <p>{block.hash}</p>
                                            </Col>
                                        </Row>
                                    </>;
                let contentBack =   <>
                                        <Row>
                                            <Col xs={12}>
                                                <p>Hash of previous Block</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <p>{block.previousHash}</p>
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
                                                <p>{block.nonce}</p>
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
                                                <p>{block.timestamp}</p>
                                            </Col>
                                        </Row>
                                    </>;
                let contentBottom = <> <p>Hello</p> </>;
                
                return (
                <Cube 
                    front={contentFront}
                    right={contentRight}
                    back={contentBack}
                    left={contentLeft}
                    top={contentTop}
                    bottom={contentBottom}
                />
                // <Card style={{ width: '18rem' }}>
                //     <Card.Header><h2>{`Block ${block.id}`}</h2></Card.Header>
                //     <ListGroup variant="flush">
                //         <ListGroup.Item>
                //             <h4>Hash</h4>
                //             <br />
                //             {block.hash}
                //         </ListGroup.Item>
                //         <ListGroup.Item>
                //             <h4>Hash of previous Block</h4>
                //             <br />
                //             {block.previousHash}
                //         </ListGroup.Item>
                //         <ListGroup.Item>
                //             <h4>Nonce</h4>
                //             <br />
                //             {block.nonce}
                //         </ListGroup.Item>
                //         <ListGroup.Item>
                //             <h4>Timestamp</h4>
                //             <br />
                //             {block.timestamp}
                //         </ListGroup.Item>
                //     </ListGroup>
                // </Card>
                )
            })}

        </div>
    )
}


export default Dashboard;