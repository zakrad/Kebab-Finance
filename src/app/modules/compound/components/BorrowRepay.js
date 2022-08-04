import Compound from "@compound-finance/compound-js";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import cTokensAbi from 'src/app/modules/compound/abi/cTokensAbi.json'

const provider = new ethers.providers.Web3Provider(window.ethereum)

const Borrow = async (ticker, amount, cToken) => {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const abi = cTokensAbi[`${ticker}`].abi
    const addressT = cTokensAbi[`${ticker}`].address
    const tokenContract = new ethers.Contract(addressT, abi, provider.getSigner());
    const feeData = await provider.getFeeData()

    const amountToBorrow = amount * Math.pow(10, underlyingDecimals)

    let tx = await tokenContract.borrow(amountToBorrow.toString(), {
        gasLimit: ethers.utils.hexlify(150000),
        gasPrice: feeData.gasPrice._hex,
    })
    await tx.wait(1);

}


const Repay = async (ticker, amount, cToken) => {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const abi = cTokensAbi[`${ticker}`].abi
    const addressT = cTokensAbi[`${ticker}`].address
    const tokenContract = new ethers.Contract(addressT, abi, provider.getSigner());
    const feeData = await provider.getFeeData()
    const underlyingToRepay = amount * Math.pow(10, underlyingDecimals)

    console.log(feeData)

    if (ticker === "ETH") {
        let tx = await tokenContract.repayBorrow({
            gasLimit: ethers.utils.hexlify(150000),
            gasPrice: feeData.gasPrice._hex,
            value: ethers.utils.hexlify(parseEther(`${amount}`))
        })
        await tx.wait(1);

    }
    else {
        let trx = await tokenContract.repayBorrow(underlyingToRepay.toString(), {
            gasLimit: ethers.utils.hexlify(150000),
            gasPrice: feeData.gasPrice._hex
        })
        await trx.wait(1);
    }

}

export { Borrow, Repay };
