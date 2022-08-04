import Compound from "@compound-finance/compound-js";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import cTokensAbi from 'src/app/modules/compound/abi/cTokensAbi.json'
import TokensAbi from 'src/app/modules/compound/abi/TokensAbi.json'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const compound = new Compound(window.ethereum);


// let testAddress = '0x859e9d8a4edadfEDb5A2fF311243af80F85A91b8'
// const addressinsta = '0x70Aad08C58CB2aF386e742460122c8501578A8FD'.toLocaleLowerCase()

const Borrow = async (account, cTokenAddress, ticker, amount, cToken) => {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const abi = cTokensAbi[`${ticker}`].abi
    const addressT = cTokensAbi[`${ticker}`].address
    const tokenContract = new ethers.Contract(addressT, abi, provider.getSigner());
    const feeData = await provider.getFeeData()

    const amountToBorrow = amount * Math.pow(10, underlyingDecimals)


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
    const abi = cTokensAbi[`${ticker}`].abi
    const addressT = cTokensAbi[`${ticker}`].address
    const tokenContract = new ethers.Contract(addressT, abi, provider.getSigner());
    const abiU = TokensAbi[`${ticker}`].abi
    const addressTU = TokensAbi[`${ticker}`].address
    const tokenContractU = new ethers.Contract(addressTU, abiU, provider.getSigner());
    const feeData = await provider.getFeeData()
    const underlyingToRepay = amount * Math.pow(10, underlyingDecimals)

    console.log(feeData)


    // let txAp = await tokenContract.approve(
    //     addressT, underlyingToRepay.toString()
    // );
    // await txAp.wait(1);

    // const estimateGasWithdraw = await tokenContract.estimateGas.redeemUnderlying(parseEther(`${amount}`));

    if (ticker === "ETH") {
        let tx = await tokenContract.repayBorrow({
            gasLimit: ethers.utils.hexlify(150000),
            gasPrice: feeData.gasPrice._hex,
            value: ethers.utils.hexlify(parseEther(`${amount}`))
        })
        await tx.wait(1);

    }
    else {
        // (async function () {
        //     const tx = await compound.repayBorrow(Compound.DAI, 32, null);
        //     console.log('Ethers.js transaction object', tx);
        // }
        // )().catch(console.error);
        // let txApprove = await tokenContract.approve(
        //     addressT, underlyingToRepay.toString()
        // );
        // await txApprove.wait(1);

        let tx = await tokenContractU.allowance(account.data, addressT)
        console.log(tx._hex);

    }

}

export { Borrow, Repay };
