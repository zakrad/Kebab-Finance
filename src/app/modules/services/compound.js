import React from 'react';
import Compound from '@compound-finance/compound-js';

const comptroller = Compound.util.getAddress(Compound.Comptroller);
const opf = Compound.util.getAddress(Compound.PriceFeed);
const address = '0x495833d72cb1C78c5f53e0fbAFdbe18E012b2482'

// const cTokens = {
//     'ETH': '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
//     'cUSDT': '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9',
//     'cUSDC': '0x39aa39c021dfbae8fac545936693ac917d5e7563',
//     'cDAI': '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
//     'cBAT': '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e',
//     'cCOMP': '0x70e36f6BF80a52b3B46b3aF8e106CC0ed743E8e4',
//     'cZRX': '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407',
//     'cUNI': '0x35A18000230DA775CAc24873d00Ff85BccdeD550',
//     'cWBTC': '0xC11b1268C1A384e55C48c2391d8d480264A3A7F4',
//     'cREP': '0x158079ee67fce2f58472a96584a73c7ab9ac95c1',
//     'cLINK': '0xFAce851a4921ce59e912d19329929CE6da6EB0c7',
//     'cTUSD': '0x12392F67bdf24faE0AF363c24aC620a2f67DAd86',
//     'AAVE' : '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c',
//     'cMKR' : '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b',
//     'cYFI' : '0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946',
//     'cSUSHI' : '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7',

// }
const provider = 'https://eth-mainnet.gateway.pokt.network/v1/lb/62c81988976624003a97f2bb'

// let cTokens = [{
//     ticker: 'ETH',
//     cToken: Compound.util.getAddress('cETH'),
//     supplied: '',
//     borrowed: '',
//     leftToBorrow: '',
//     hasEntered: '',
// }]

const eneteredMarkets = async (address) => {
    const getAssetsIn = await Compound.eth.read(
        comptroller,
        'function getAssetsIn(address account) view returns (address[] memory)',
        [address],
        { provider }
    );
    console.log(getAssetsIn);
}

const Main = async (cToken) => {
    const cTokenAddress = Compound.util.getAddress(cToken);
    console.log(cTokenAddress);

    eneteredMarkets(address, provider)
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
    console.log(getUnderlyingBalance);

    return getLiquidity
}

Main().catch((err) => {
    console.error('ERROR:', err);
});

export default Main;
