const ethers = require('ethers');

const provider = new ethers.providers.Web3Provider(window.ethereum)


const getBalance = async (account, token) => {
    const { tokenAddress, tokenAbi } = `../abi/${token}Abi.json`
    const contract = new ethers.Contract(tokenAddress, tokenAbi, provider);
    const balance = (await contract.balanceOf(account).toString())
    return balance
}

const getEthBalance = async (account) => {
    const balance = await provider.getBalance(account);
    return balance
}

export { getBalance, getEthBalance };

