import { ethers } from "ethers";
import TokensAbi from 'src/app/modules/compound/abi/TokensAbi.json'



const Supply = async (account, cTokenAddress, ticker, amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const abi = TokensAbi[`${ticker}`].abi
    const addressT = TokensAbi[`${ticker}`].address
    const tokenContract = new ethers.Contract(addressT, abi, provider.getSigner());
    const trx = await tokenContract.methods.mint().send({
        from: account.data,
        gasLimit: ethers.utils.hexlify(250000),
        gasPrice: ethers.utils.hexlify(20000000000), // use ethgasstation.info (mainnet only)
        value: ethers.utils.hexlify(ethers.parseUnits(`${amount}`, 'ether'))
    })
    return trx
}


const Withdraw = async (account, cTokenAddress, ticker, amount) => {
    // const trx = await compound.exitMarket(cTokenAddress, { from: account.data });
    // return trx
}

export { Supply, Withdraw };
