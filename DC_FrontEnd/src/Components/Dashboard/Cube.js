import React from 'react';
import './Cube.css';

function Cube(props) {
    return (
        <>
            <div className="custom-container">
                
                <input type="radio" id="a" label="Front" name="side"/>
                <label for="a">Block</label><br/>
                <input type="radio" id="b" label="Front" name="side"/>
                <label for="b">Hash</label><br/>
                <input type="radio" id="c" label="Front" name="side"/>
                <label for="c">Hash of previous Block</label><br/>
                <input type="radio" id="d" label="Front" name="side"/>
                <label for="d">Nonce</label><br/>
                <input type="radio" id="e" label="Front" name="side"/>
                <label for="e">Timestamp</label><br/>
                <input type="radio" id="f" label="Front" name="side"/>
                <label for="f">Bottom</label>
                

                <div className="cube">
                    <div className="face top gold-background">{props.top}</div>
                    <div className="face bottom gold-background">{props.bottom}</div>
                    <div className="face left gold-background">{props.left}</div>
                    <div className="face right gold-background">{props.right}</div>
                    <div className="face front gold-background">{props.front}</div>
                    <div className="face back gold-background">{props.back}</div>
                </div>
            </div>
        </>
    )
}

export default Cube
