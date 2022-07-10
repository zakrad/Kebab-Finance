import Compound from '@compound-finance/compound-js';
import { BigNumber, ethers } from 'ethers';


const provider = 'https://speedy-nodes-nyc.moralis.io/453da2a22cc39051bdeaaeb2/eth/mainnet';
// const provider = 'https://eth-mainnet.gateway.pokt.network/v1/lb/62c81988976624003a97f2bb'

const comptroller = Compound.util.getAddress(Compound.Comptroller);
const opf = Compound.util.getAddress(Compound.PriceFeed);
const address = '0x495833d72cb1C78c5f53e0fbAFdbe18E012b2482'




// const cTokenDecimals = 8; // always 8
const blocksPerDay = (60 / 13.15) * 60 * 24; // 4 blocks in 1 minute
const daysPerYear = 365;
const ethMantissa = Math.pow(10, 18); // 1 * 10 ^ 18

let underWater = 0;

const eneteredMarkets = async (cToken, address) => {
    const getAssetsIn = await Compound.eth.read(
        comptroller,
        'function getAssetsIn(address account) view returns (address[] memory)',
        [address],
        { provider }
    )
    if (getAssetsIn.includes(cToken)) {
        return true
    } else {
        return false
    }
}

const getBorrowBalance = async (cToken, address) => {
    const getBorrowBalance = await Compound.eth.read(
        cToken,
        'function borrowBalanceCurrent(address account) returns (uint)',
        [address],
        { provider }
    );
    const borrowBalance = Math.round(Number(ethers.utils.formatEther(BigNumber.from(parseInt((getBorrowBalance._hex)).toLocaleString('fullwide', { useGrouping: false })))) * 100) / 100
    return borrowBalance

}

const getLiquidity = async (address) => {
    const getLiquidity = await Compound.eth.read(
        comptroller,
        'function getAccountLiquidity(address account) view returns (uint, uint, uint)',
        [address],
        { provider }
    );
    if (getLiquidity[1] !== 0) {
        return Math.round(Number(ethers.utils.formatEther(BigNumber.from(parseInt((getLiquidity[1]._hex)).toLocaleString('fullwide', { useGrouping: false })))) * 100) / 100
    } else if (getLiquidity[2] !== 0) {
        underWater = 1
        return 0
    }
}

const getUnderlyingBalance = async (cToken, address) => {
    const getUnderlyingBalance = await Compound.eth.read(
        cToken,
        'function balanceOfUnderlying(address account) returns (uint)',
        [address],
        { provider }
    );
    console.log(getUnderlyingBalance);
}



async function calculateSupplyApy(cToken) {
    const supplyRatePerBlock = await Compound.eth.read(
        cToken,
        'function supplyRatePerBlock() returns (uint)',
        [],
        { provider }
    );

    return 100 * (Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear) - 1);
}

async function calculateBorrowApy(cToken) {
    const borrowRatePerBlock = await Compound.eth.read(
        cToken,
        'function borrowRatePerBlock() returns (uint)',
        [],
        { provider }
    );

    return 100 * (Math.pow((borrowRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear) - 1);
}

async function calculateCompApy(cToken, ticker, underlyingDecimals) {
    let compSupplySpeed = await Compound.eth.read(
        comptroller,
        'function compSupplySpeeds(address cToken) public returns (uint)',
        [cToken],
        { provider }
    );

    let compBorrowSpeed = await Compound.eth.read(
        comptroller,
        'function compBorrowSpeeds(address cToken) public returns (uint)',
        [cToken],
        { provider }
    );

    let compPrice = await Compound.eth.read(
        opf,
        'function price(string memory symbol) external view returns (uint)',
        [Compound.COMP],
        { provider }
    );

    let underlyingPrice = await Compound.eth.read(
        opf,
        'function price(string memory symbol) external view returns (uint)',
        [ticker],
        { provider }
    );

    let totalSupply = await Compound.eth.read(
        cToken,
        'function totalSupply() returns (uint)',
        [],
        { provider }
    );

    let totalBorrow = await Compound.eth.read(
        cToken,
        'function totalBorrowsCurrent() returns (uint)',
        [],
        { provider }
    );

    let exchangeRate = await Compound.eth.read(
        cToken,
        'function exchangeRateCurrent() returns (uint)',
        [],
        { provider }
    );


    exchangeRate = +exchangeRate.toString() / ethMantissa;
    compSupplySpeed = compSupplySpeed / 1e18; // COMP has 18 decimal places
    compBorrowSpeed = compBorrowSpeed / 1e18;
    compPrice = compPrice / 1e6;  // price feed is USD price with 6 decimal places
    underlyingPrice = underlyingPrice / 1e6;
    totalSupply = (+totalSupply.toString() * exchangeRate) / (Math.pow(10, underlyingDecimals));
    totalBorrow = +totalBorrow.toString() / (Math.pow(10, underlyingDecimals));
    const compToSupplyPerDay = compSupplySpeed * blocksPerDay;
    const compToBorrowPerDay = compBorrowSpeed * blocksPerDay;


    const compBorrowApy = 100 * (Math.pow((1 + (compPrice * compToBorrowPerDay / (totalBorrow * underlyingPrice))), 365) - 1);
    const compSupplyApy = 100 * (Math.pow((1 + (compPrice * compToSupplyPerDay / (totalSupply * underlyingPrice))), 365) - 1);


    return [compSupplyApy, compBorrowApy]
}


async function calculateApy(cToken, ticker) {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const cTokenAddress = Compound.util.getAddress(cToken);
    const [supplyAPY, borrowAPY, hasEntered, borrowed, letfToBorrow] = await Promise.all([
        calculateSupplyApy(cTokenAddress),
        calculateBorrowApy(cTokenAddress),
        eneteredMarkets(cTokenAddress, address),
        getBorrowBalance(cTokenAddress, address),
        getLiquidity(address)

    ]);
    const [compApy] = await Promise.all(
        [calculateCompApy(cTokenAddress, ticker, underlyingDecimals)]
    )
    getLiquidity(address)
    getUnderlyingBalance(cTokenAddress, address)
    const compSupplyApy = Math.round(compApy[0] * 100) / 100
    const compBorrowApy = Math.round(compApy[1] * 100) / 100
    const supplyApy = Math.round(supplyAPY * 100) / 100
    const borrowApy = Math.round(borrowAPY * 100) / 100
    return { ticker, hasEntered, borrowed, letfToBorrow, supplyApy, borrowApy, compSupplyApy, compBorrowApy, underWater };
}

export default calculateApy;