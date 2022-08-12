const axios = require('axios')

const baseUrl = 'https://api.ethplorer.io/'
const APIKEY = process.env.ETHPLORER_API_KEY

export class AppService {
  public async getAddressTokens(address: string): Promise<any> {
    const response = await axios.get(`${baseUrl}/address/${address}/balances_v2/?key=${APIKEY}`)
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
