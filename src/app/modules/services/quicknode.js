import { ethers } from 'ethers';

const quickNodeRpc = process.env.REACT_APP_QUICKNODE_RPC

const provider = new ethers.providers.JsonRpcProvider(`https://morning-divine-glade.discover.quiknode.pro/${quickNodeRpc}`);

const getNfts = async (pageNumber, address) => {
    console.log(address)

    // provider.connection.headers = { "x-qn-api-version": 1 };
    const heads = await provider.send("qn_fetchNFTs", {
        wallet: address,
        omitFields: ["provenance"],
        page: pageNumber,
        perPage: 12,
    });
    return heads.assets
};

export const getTotalItem = async (address) => {
    console.log(address)

    const totalItems = await provider.send("qn_fetchNFTs", {
        wallet: address,
        omitFields: ["provenance", "traits"],
        page: 1,
        perPage: 12,
    });
    const totalItem = totalItems.totalItems
    return totalItem
}


export default getNfts;