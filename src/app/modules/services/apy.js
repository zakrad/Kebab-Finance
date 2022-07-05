import Compound from '@compound-finance/compound-js';

const provider = 'https://speedy-nodes-nyc.moralis.io/453da2a22cc39051bdeaaeb2/eth/mainnet';

const comptroller = Compound.util.getAddress(Compound.Comptroller);
const opf = Compound.util.getAddress(Compound.PriceFeed);

const cTokenDecimals = 8; // always 8
const blocksPerDay = 4 * 60 * 24; // 4 blocks in 1 minute
const daysPerYear = 365;
const ethMantissa = Math.pow(10, 18); // 1 * 10 ^ 18

async function calculateSupplyApy(cToken) {
    const supplyRatePerBlock = await Compound.eth.read(
        cToken,
        'function supplyRatePerBlock() returns (uint)',
        [],
        { provider }
    );

    return 100 * (Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear - 1) - 1);
}

async function calculateBorrowApy(cToken) {
    const borrowRatePerBlock = await Compound.eth.read(
        cToken,
        'function borrowRatePerBlock() returns (uint)',
        [],
        { provider }
    );

    return 100 * (Math.pow((borrowRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear - 1) - 1);
}

async function calculateSupplyCompApy(cToken, ticker, underlyingDecimals) {
    let compSupplySpeed = await Compound.eth.read(
        comptroller,
        'function compSupplySpeeds(address cToken) public returns (uint)',
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

    let exchangeRate = await Compound.eth.read(
        cToken,
        'function exchangeRateCurrent() returns (uint)',
        [],
        { provider }
    );

    exchangeRate = +exchangeRate.toString() / ethMantissa;
    compSupplySpeed = compSupplySpeed / 1e18; // COMP has 18 decimal places
    compPrice = compPrice / 1e6;  // price feed is USD price with 6 decimal places
    underlyingPrice = underlyingPrice / 1e6;
    totalSupply = (+totalSupply.toString() * exchangeRate * underlyingPrice) / (Math.pow(10, underlyingDecimals));
    const compPerDay = compSupplySpeed * blocksPerDay;

    return 100 * (compPrice * compPerDay / totalSupply) * 365;
}

async function calculateBorrowCompApy(cToken, ticker, underlyingDecimals) {
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
    compBorrowSpeed = compBorrowSpeed / 1e18; // COMP has 18 decimal places
    compPrice = compPrice / 1e6;  // price feed is USD price with 6 decimal places
    underlyingPrice = underlyingPrice / 1e6;
    totalBorrow = (+totalBorrow.toString() * exchangeRate * underlyingPrice) / (Math.pow(10, underlyingDecimals));
    const compPerDay = compBorrowSpeed * blocksPerDay;

    return 100 * (compPrice * compPerDay / totalBorrow) * 365;
}

async function calculateApy(cToken, ticker) {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const cTokenAddress = Compound.util.getAddress(cToken);
    const [supplyApy, compSupplyApy] = await Promise.all([
        calculateSupplyApy(cTokenAddress),
        calculateSupplyCompApy(cTokenAddress, ticker, underlyingDecimals)
    ]);
    const [borrowApy, compBorrowApy] = await Promise.all([
        calculateBorrowApy(cTokenAddress),
        calculateBorrowCompApy(cTokenAddress, ticker, underlyingDecimals)
    ]);
    return { ticker, supplyApy, compSupplyApy, borrowApy, compBorrowApy };
}

export default calculateApy;