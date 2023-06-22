import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const settlements = (tops: number) => gql`
  {
    accounts(first: ${tops},orderBy: totalSettlementFee, orderDirection: desc,where: { settlementCount_gt:0 }) {
      id
      settlementCount
      totalSettlementFee
    }
    governances {
      totalSettlementFee
    }
  }
`;

export const clientFactory = (uri: string) =>
    new ApolloClient({
        uri,
        cache: new InMemoryCache(),
    });
