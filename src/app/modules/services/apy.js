import Compound from '@compound-finance/compound-js';

const provider = 'https://speedy-nodes-nyc.moralis.io/453da2a22cc39051bdeaaeb2/eth/mainnet';

const comptroller = Compound.util.getAddress(Compound.Comptroller);
const opf = Compound.util.getAddress(Compound.PriceFeed);

const cTokenDecimals = 8; // always 8
const blocksPerDay = (60 / 13.15) * 60 * 24; // 4 blocks in 1 minute
const daysPerYear = 365;
const ethMantissa = Math.pow(10, 18); // 1 * 10 ^ 18

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
    const [supplyApy, borrowApy] = await Promise.all([
        calculateSupplyApy(cTokenAddress),
        calculateBorrowApy(cTokenAddress),
    ]);
    const [compApy] = await Promise.all(
        [calculateCompApy(cTokenAddress, ticker, underlyingDecimals)]
    )
    const compSupplyApy = compApy[0]
    const compBorrowApy = compApy[1]
    return { ticker, supplyApy, borrowApy, compSupplyApy, compBorrowApy };
}

export default calculateApy;