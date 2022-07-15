import Compound from '@compound-finance/compound-js';


const compound = new Compound(window.ethereum);

const EnterMarket = async (account, cToken) => {
    const trx = await compound.enterMarkets(cToken, { from: account.data });
    return trx
}


const ExitMarket = async (account, cToken) => {
    const trx = await compound.exitMarket(cToken, { from: account.data });
    return trx
}

export { EnterMarket, ExitMarket };
