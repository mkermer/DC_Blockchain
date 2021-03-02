import React, { useState, useEffect } from 'react'

const DisplayTransactionsOfBlock = (props) => {
    const transactions = props.transactions;



    if (transactions == []) {
        return (
            <h1> There are no transaction </h1>
        )
    } else {
        return (
            <div>

                <h1>Transactions of the {props.blockID} block</h1>
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

}


export default DisplayTransactionsOfBlock