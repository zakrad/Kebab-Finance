import Compound from "@compound-finance/compound-js";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import TokensAbi from 'src/app/modules/compound/abi/TokensAbi.json'

let testAddress = '0x859e9d8a4edadfEDb5A2fF311243af80F85A91b8'

const Supply = async (account, cTokenAddress, ticker, amount, cToken) => {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const providerEstimate = ethers.getDefaultProvider();
    const abi = TokensAbi[`${ticker}`].abi
    const addressT = TokensAbi[`${ticker}`].address
    const tokenContract = new ethers.Contract(addressT, abi, provider.getSigner());
    const amountToSupply = amount * Math.pow(10, underlyingDecimals)
    // let tx = await tokenContract.approve(
    //     addressT, amountToSupply.toString()
    // );
    // await tx.wait(1);

    const estimateGasSupply = await provider.estimateGas({
        to: addressT,
        data: "0x1249c58b",
        value: parseEther(`${amount}`)
    });
    const estimateGasApprove = await tokenContract.estimateGas.approve(account.data, parseEther(`${amount}`));

    const feeData = await provider.getFeeData()
    console.log(feeData, estimateGasSupply, estimateGasApprove)


    // let tx = await tokenContract.mint({
    //     gasLimit: ethers.utils.hexlify(250000),
    //     gasPrice: ethers.utils.hexlify(20000000000),
    //     value: ethers.utils.hexlify(ethers.utils.parseUnits(`${amount}`, 'ether'))
    // })
    // await tx.wait(1);

}


const Withdraw = async (account, cTokenAddress, ticker, amount) => {
    // const trx = await compound.exitMarket(cTokenAddress, { from: account.data });
    // return trx
}

export { Supply, Withdraw };
