import { ethers } from 'ethers';


const provider = new ethers.providers.JsonRpcProvider("https://morning-divine-glade.discover.quiknode.pro/a0af953409c1d0f244e39c81662f783424b06922/");

const getNfts = async (pageNumber, address) => {

    // provider.connection.headers = { "x-qn-api-version": 1 };
    const heads = await provider.send("qn_fetchNFTs", {
        wallet: address,
        omitFields: ["provenance"],
        page: pageNumber,
        perPage: 12,
    });
    console.log(heads);
    return heads.assets
};

export const getTotalItem = async (address) => {

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