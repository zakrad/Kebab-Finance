import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider("https://morning-divine-glade.discover.quiknode.pro/a0af953409c1d0f244e39c81662f783424b06922/");

const getNfts = async (pageNumber) => {

    // provider.connection.headers = { "x-qn-api-version": 1 };
    const heads = await provider.send("qn_fetchNFTs", {
        wallet: "0x91b51c173a4bdaa1a60e234fc3f705a16d228740",
        omitFields: ["provenance"],
        page: pageNumber,
        perPage: 4,
    });
    console.log(heads);
};

export default getNfts;