import Compound from "@compound-finance/compound-js";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import TokensAbi from 'src/app/modules/compound/abi/TokensAbi.json'

const provider = new ethers.providers.Web3Provider(window.ethereum)



// let testAddress = '0x859e9d8a4edadfEDb5A2fF311243af80F85A91b8'
// const addressinsta = '0x70Aad08C58CB2aF386e742460122c8501578A8FD'.toLocaleLowerCase()

const Borrow = async (account, cTokenAddress, ticker, amount, cToken) => {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const abi = TokensAbi[`${ticker}`].abi
    const addressT = TokensAbi[`${ticker}`].address
    const tokenContract = new ethers.Contract(addressT, abi, provider.getSigner());
    const feeData = await provider.getFeeData()

    const amountToBorrow = amount * Math.pow(10, underlyingDecimals)
    // let tx = await tokenContract.approve(
    //     addressT, amountToSupply.toString()
    // );
    // await tx.wait(1);

    // const estimateGasBorrow = await tokenContract.estimateGas.borrow(amountToBorrow);


    // console.log(feeData, estimateGasBorrow)

    let tx = await tokenContract.borrow(amountToBorrow.toString(), {
        gasLimit: ethers.utils.hexlify(150000),
        gasPrice: feeData.gasPrice._hex,
    })
    await tx.wait(1);

}


const Repay = async (account, cTokenAddress, ticker, amount, cToken) => {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const abi = TokensAbi[`${ticker}`].abi
    const addressT = TokensAbi[`${ticker}`].address
    const tokenContract = new ethers.Contract(addressT, abi, provider.getSigner());
    const feeData = await provider.getFeeData()
    const underlyingToRepay = amount * Math.pow(10, underlyingDecimals)

    console.log(feeData)


    // let txAp = await tokenContract.approve(
    //     addressT, underlyingToRepay.toString()
    // );
    // await txAp.wait(1);

    // const estimateGasWithdraw = await tokenContract.estimateGas.redeemUnderlying(parseEther(`${amount}`));


    let tx = await tokenContract.repayBorrow(underlyingToRepay.toString(), {
        gasLimit: ethers.utils.hexlify(150000),
        gasPrice: feeData.gasPrice._hex,
    })
    await tx.wait(1);

}

export { Borrow, Repay };
