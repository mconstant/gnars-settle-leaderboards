import React from 'react';
import './App.css';
import {useQuery} from "@apollo/client";
import {settlements} from './wrappers/subgraph';
import {useCoingeckoPrice} from "@usedapp/coingecko";
import { Table } from 'react-bootstrap';
import { ethers } from 'ethers';

function App() {
    const {loading, error, data} = useQuery(settlements(10));
    const etherPrice = Number(useCoingeckoPrice('ethereum', 'usd'));

    if (loading) {
        return (
            <div>
                <b>loading...</b>
            </div>
        );
    } else if (error) {
        return (
            <div>
                <b>error...</b>
            </div>
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    gnars settlement leaderboards
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Table borderless style={{ alignSelf: 'center', width: 800 }}>
                        <tr>
                            <th>#</th>
                            <th>Rank</th>
                            <th style={{ textAlign: 'center' }}>#Settled</th>
                            <th style={{ textAlign: 'center' }}>%Settled</th>
                            <th style={{ textAlign: 'center' }}>Total ETH</th>
                            <th style={{ textAlign: 'center' }}>Total $</th>
                        </tr>
                {/**/}
                        {data.accounts.map((item: any, index: number) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td style={{ textAlign: 'center' }}>{item.settlementCount}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {(
                                        (item.totalSettlementFee / data.governances[0]?.totalSettlementFee) *
                                        100
                                    ).toFixed(2)}{' '}
                                    %
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {ethers.utils.formatEther(item.totalSettlementFee).substring(0, 5)}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {(Number(ethers.utils.formatEther(item.totalSettlementFee)) * etherPrice).toFixed(
                                        2,
                                    )}
                                </td>
                            </tr>
                        ))}
                    </Table>
                </div>
            </header>
        </div>
    );
}

export default App;
