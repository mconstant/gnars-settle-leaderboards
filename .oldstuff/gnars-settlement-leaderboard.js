import { settlements } from "../src/wrappers/subgraph.js";
import pkg from '@apollo/client';
const { useQuery } = pkg;
import { useCoingeckoPrice } from "@usedapp/coingecko";
import { Interface } from 'ethers/lib/utils.js';

const{ loading, error, data } = useQuery(settlements(10));

const etherPrice = Number(useCoingeckoPrice('ethereum', 'usd'));

const leaderBoard = data.accounts.map((item, index) => {
    return {
        place: (index + 1),
        address: item.id,
        settlement_count: item.settlement_count,
        percent_settled: (
            (item.totalSettlementFee / data.governances[0]?.totalSettlementFee) *
            100
        ).toFixed(2),
        total_eth: ethers.utils.formatEther(item.totalSettlementFee).substring(0, 5),
        total_dollars: (Number(ethers.utils.formatEther(item.totalSettlementFee)) * etherPrice).toFixed(2)
    };
});

console.log(leaderBoard)