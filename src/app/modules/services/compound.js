import Compound from '@compound-finance/compound-js';
import { BigNumber, ethers } from 'ethers';
import TokensAbi from 'src/app/modules/compound/abi/TokensAbi.json'



// const provider = 'https://speedy-nodes-nyc.moralis.io/453da2a22cc39051bdeaaeb2/eth/mainnet';
// const provider = 'https://eth-mainnet.gateway.pokt.network/v1/lb/62cfd5feb37b8e00392ac751'
// const provider = 'https://eth-mainnet.g.alchemy.com/v2/ObJhlL6vyv-RhsM7MQF7xW-4QuZCX5hF'
// const provider = 'https://mainnet.infura.io/v3/e420812a57104e7990fa4af22683bd36'
const provider = 'https://rpc.ankr.com/eth'
// const provider = 'https://morning-divine-glade.discover.quiknode.pro/a0af953409c1d0f244e39c81662f783424b06922/'

const wProvider = new ethers.providers.Web3Provider(window.ethereum)

const comptroller = Compound.util.getAddress(Compound.Comptroller);
const opf = Compound.util.getAddress(Compound.PriceFeed);
const address = '0x70Aad08C58CB2aF386e742460122c8501578A8FD'.toLocaleLowerCase()
const address2 = '0xb0df05c8832f0249ef5bfe8a720f27b3b059bd9e'.toLocaleLowerCase()




// const cTokenDecimals = 8; // always 8
const blocksPerDay = (60 / 13.15) * 60 * 24; // 4 blocks in 1 minute
const daysPerYear = 365;
const ethMantissa = Math.pow(10, 18); // 1 * 10 ^ 18
let tokenBalance;

let underWater = false;

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

const getBorrowBalance = async (cToken, address, ticker) => {
    const getBorrowBalance = await Compound.eth.read(
        cToken,
        'function borrowBalanceCurrent(address account) returns (uint)',
        [address],
        { provider }
    );
    const underlyingPrice = await Compound.eth.read(
        opf,
        'function price(string memory symbol) external view returns (uint)',
        [ticker],
        { provider }
    );

    const borrowBalance = Math.round(Number(ethers.utils.formatEther(BigNumber.from(parseInt((getBorrowBalance._hex)).toLocaleString('fullwide', { useGrouping: false })))) * 100) / 100
    return Math.round((borrowBalance * underlyingPrice / 1e6) * 100) / 100

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
        underWater = true
        return 0
    }
}

const getUnderlyingBalance = async (cToken, address, underlyingDecimals) => {
    const getUnderlyingBalance = await Compound.eth.read(
        cToken,
        'function balanceOfUnderlying(address account) returns (uint)',
        [address],
        { provider }
    );
    // console.log(underlyingDecimals)
    return Math.round(Number(ethers.utils.formatUnits(BigNumber.from(parseInt((getUnderlyingBalance._hex)).toLocaleString('fullwide', { useGrouping: false })), underlyingDecimals)) * 100) / 100
}

const getUnderlyingValue = async (cToken, address, ticker, underlyingDecimals) => {
    const getUnderlyingBalance = await Compound.eth.read(
        cToken,
        'function balanceOfUnderlying(address account) returns (uint)',
        [address],
        { provider }
    );
    const underlyingPrice = await Compound.eth.read(
        opf,
        'function price(string memory symbol) external view returns (uint)',
        [ticker],
        { provider }
    );

    const underlyingBalance = Number(ethers.utils.formatUnits(BigNumber.from(parseInt((getUnderlyingBalance._hex)).toLocaleString('fullwide', { useGrouping: false })), underlyingDecimals))

    return Math.round((underlyingBalance * underlyingPrice / 1e6) * 100) / 100
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


    return [compSupplyApy, compBorrowApy, underlyingPrice]
}

const getBalance = async (account, ticker, underlyingDecimals) => {
    const abi = TokensAbi[`${ticker}`].abi
    const addressT = TokensAbi[`${ticker}`].address
    const contract = new ethers.Contract(addressT, abi, wProvider);
    const balanceR = (await contract.balanceOf(account))
    return Math.round(Number(ethers.utils.formatUnits(BigNumber.from(parseInt((balanceR._hex)).toLocaleString('fullwide', { useGrouping: false })), underlyingDecimals)) * 100) / 100
}

const getEthBalance = async (account, underlyingDecimals) => {
    const balanceR = await wProvider.getBalance(account);
    return Math.round(Number(ethers.utils.formatUnits(BigNumber.from(parseInt((balanceR._hex)).toLocaleString('fullwide', { useGrouping: false })), underlyingDecimals)) * 100) / 100
}

const getBal = async (ticker, underlyingDecimals) => {
    if (ticker === "ETH") {
        tokenBalance = await getEthBalance(address2, underlyingDecimals)
        return tokenBalance

    } else {
        tokenBalance = await getBalance(address2, ticker, underlyingDecimals)
        return tokenBalance
    }
}


async function calculateApy(cToken, ticker) {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const cTokenAddress = Compound.util.getAddress(cToken);
    const [supplyAPY, borrowAPY, borrowed, supplied, suppliedValue, hasEntered, tokenBalance] = await Promise.all([
        calculateSupplyApy(cTokenAddress),
        calculateBorrowApy(cTokenAddress),
        getBorrowBalance(cTokenAddress, address, ticker),
        getUnderlyingBalance(cTokenAddress, address, underlyingDecimals),
        getUnderlyingValue(cTokenAddress, address, ticker, underlyingDecimals),
        eneteredMarkets(cTokenAddress, address),
        getBal(ticker, underlyingDecimals)
    ]);
    const [compApy] = await Promise.all(
        [calculateCompApy(cTokenAddress, ticker, underlyingDecimals)]
    )
    const compSupplyApy = Math.round(compApy[0] * 100) / 100
    const compBorrowApy = Math.round(compApy[1] * 100) / 100
    const underlyingPrice = Math.round(compApy[3] * 100) / 100
    const supplyApy = Math.round(supplyAPY * 100) / 100
    const borrowApy = Math.round(borrowAPY * 100) / 100
    return { ticker, cToken, cTokenAddress, borrowed, supplied, suppliedValue, supplyApy, borrowApy, compSupplyApy, compBorrowApy, hasEntered, underlyingPrice, tokenBalance };
}

export async function getInfo() {
    const compRaw = await Compound.comp.getCompAccrued(address)
    const comp = Math.round(compRaw / 1e18 * 100) / 100
    const [leftToBorrow] = await Promise.all([
        getLiquidity(address)
    ])

    return { comp, leftToBorrow, underWater }
}


export default calculateApy;