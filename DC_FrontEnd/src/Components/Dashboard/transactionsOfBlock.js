import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/app.action';


const DisplayTransactionsOfBlock = (props) => {
    const transactions = props.applicationState.block.transactions;
    //test
    return (
        <div>

            <h1>Transactions of the {props.applicationState.block.id} block</h1>
            <table>
                <thead>
                    <tr>
                        <th>From</th>
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
                                <td>{transaction.fromAdress}</td>
                                <td>{transaction.toAdress}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.hash}</td>
                                <td>{transaction.timestamp}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}



const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(DisplayTransactionsOfBlock);