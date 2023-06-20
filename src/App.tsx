import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useQuery} from "@apollo/client";
import { settlements } from '../wrappers/subgraph';
import {useCoingeckoPrice} from "@usedapp/coingecko";

function App() {
  const { loading, error, data } = useQuery(settlements(tops || 10));
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
                <img src={logo} className="App-logo" alt="logo"/>

                <p>
                    gnars settlement leaderboards
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
