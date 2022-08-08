const axios = require('axios')

const baseUrl = 'https://api.covalenthq.com/v1/1'
const APIKEY = 'ckey_3ba0924394b1481284c158d7b11'

export class AppService {
  public async getAddressTokens(address: string): Promise<any> {
    const response = await axios.get(`${baseUrl}/address/${address}/balances_v2/?key=${APIKEY}`)
    return response.data
  }

  public async getAddressNfts(address: string): Promise<any> {
    const response = await axios.get(
      `${baseUrl}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=true&key=${APIKEY}`
    )
    return response.data
  }

  public async getTx(txHash: string): Promise<any> {
    const response = await axios.get(`${baseUrl}/transaction_v2/${txHash}/?key=${APIKEY}`)
    return response.data
  }

  public async getHistoricalValue(address: string): Promise<any> {
    const response = await axios.get(`${baseUrl}/address/${address}/portfolio_v2/?key=${APIKEY}`)
    return response.data
  }
}
