import React, { Component } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blocks: [],
            id: 1,
            hash: "",
            previousHash: "",
            nonce: 0,
            timestamp: "",
            transactions: []
        }
    }

    //ComponentdidMount to display all the blocks 

    render() {
        return (
            <div>
                <h1>Blocks on DC chain</h1>
                <p> The latest 5 blocks on the chain: </p>
                <Card style={{ width: '18rem' }}>
                    <Card.Header><h2>{`Block ${this.state.id}`}</h2></Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Hash</h4>
                            <br />
                            {this.state.hash}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Hash of previous Block</h4>
                            <br />
                            {this.state.previousHash}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Nonce</h4>
                            <br />
                            {this.state.nonce}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Timestamp</h4>
                            <br />
                            {this.state.timestamp}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        )
    }
}

export default Dashboard;