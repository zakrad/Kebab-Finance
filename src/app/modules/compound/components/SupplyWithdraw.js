import Compound from "@compound-finance/compound-js";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import cTokensAbi from 'src/app/modules/compound/abi/cTokensAbi.json'

const provider = new ethers.providers.Web3Provider(window.ethereum)



// let testAddress = '0x859e9d8a4edadfEDb5A2fF311243af80F85A91b8'
// const addressinsta = '0x70Aad08C58CB2aF386e742460122c8501578A8FD'.toLocaleLowerCase()

const Supply = async (account, cTokenAddress, ticker, amount, cToken) => {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const abi = cTokensAbi[`${ticker}`].abi
    const addressT = cTokensAbi[`${ticker}`].address
    const tokenContract = new ethers.Contract(addressT, abi, provider.getSigner());
    const feeData = await provider.getFeeData()

    const amountToSupply = amount * Math.pow(10, underlyingDecimals)
    // let tx = await tokenContract.approve(
    //     addressT, amountToSupply.toString()
    // );
    // await tx.wait(1);

    // const estimateGasApprove = await tokenContract.estimateGas.approve(account.data, parseEther(`${amount}`));

    const estimateGasSupply = await provider.estimateGas({
        to: addressT,
        data: "0x1249c58b",
        value: amountToSupply.toString()
    });


    console.log(feeData, estimateGasSupply)
    if (ticker === "ETH") {
        let tx = await tokenContract.mint({
            gasLimit: estimateGasSupply._hex,
            gasPrice: feeData.gasPrice._hex,
            value: ethers.utils.hexlify(parseEther(`${amount}`))
        })
        await tx.wait(1);
    } else {
        let tx = await tokenContract.mint(amountToSupply.toString(), {
            gasLimit: ethers.utils.hexlify(150000),
            gasPrice: feeData.gasPrice._hex
        })
        await tx.wait(1);
    }

}


const Withdraw = async (account, cTokenAddress, ticker, amount, cToken) => {
    const abi = cTokensAbi[`${ticker}`].abi
    const addressT = cTokensAbi[`${ticker}`].address
    const tokenContract = new ethers.Contract(addressT, abi, provider.getSigner());
    const feeData = await provider.getFeeData()
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const amountToWithdraw = amount * Math.pow(10, underlyingDecimals)




    if (ticker === "ETH") {
        const estimateGasWithdraw = await tokenContract.estimateGas.redeemUnderlying(parseEther(`${amount}`));
        console.log(feeData, estimateGasWithdraw);
        let tx = await tokenContract.redeemUnderlying(parseEther(`${amount}`), {
            gasLimit: estimateGasWithdraw._hex,
            gasPrice: feeData.gasPrice._hex,
        })
        await tx.wait(1);
    } else {
        let tx = await tokenContract.redeemUnderlying(amountToWithdraw.toString(), {
            gasLimit: ethers.utils.hexlify(150000),
            gasPrice: feeData.gasPrice._hex,
        })
        await tx.wait(1);
    }


}

export { Supply, Withdraw };
