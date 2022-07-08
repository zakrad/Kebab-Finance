import React from 'react';
import Compound from '@compound-finance/compound-js';

const comptroller = Compound.util.getAddress(Compound.Comptroller);
const opf = Compound.util.getAddress(Compound.PriceFeed);
const address = '0x495833d72cb1C78c5f53e0fbAFdbe18E012b2482'


const Main = async (cToken, provider) => {
    const cTokenAddress = Compound.util.getAddress(cToken);

    const getAssetsIn = await Compound.eth.read(
        comptroller,
        'function getAssetsIn(address account) view returns (address[] memory)',
        [address],
        { provider }
    );
    console.log(getAssetsIn);

    const getLiquidity = await Compound.eth.read(
        comptroller,
        'function getAccountLiquidity(address account) view returns (uint, uint, uint)',
        [address],
        { provider }
    );
    console.log(getLiquidity);

    const getBorrowBalance = await Compound.eth.read(
        cTokenAddress,
        'function borrowBalanceCurrent(address account) returns (uint)',
        [address],
        { provider }
    );
    console.log(getBorrowBalance);

    const getUnderlyingBalance = await Compound.eth.read(
        cTokenAddress,
        'function balanceOfUnderlying(address account) returns (uint)',
        [address],
        { provider }
    );
    console.log(getBorrowBalance);

    return getLiquidity
}

Main().catch((err) => {
    console.error('ERROR:', err);
});

export default Main;
