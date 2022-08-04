import { ethers } from "ethers";
import TokensAbi from 'src/app/modules/compound/abi/TokensAbi.json'

const provider = new ethers.providers.Web3Provider(window.ethereum)

const Approve = async (cTokenAddress, ticker) => {
    const abiU = TokensAbi[`${ticker}`].abi
    const addressTU = TokensAbi[`${ticker}`].address
    const tokenContractU = new ethers.Contract(addressTU, abiU, provider.getSigner());
    const amountToSupply = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

    let tx = await tokenContractU.approve(cTokenAddress, amountToSupply);
    await tx.wait(1);

}






export { Approve };
