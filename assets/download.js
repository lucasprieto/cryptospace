const Coingecko = require('coingecko-api')
const axios = require('axios')
const _ = require('lodash')
const path = require('path')
const fs = require('fs')  

const coingecko = new Coingecko()
const a = axios.default.create({ })

const main = async () => {
    const { data: list } = await coingecko.coins.list()

    const { data } = await a.get('https://ftx.com/api/markets')
    if (data.success) {
        const { result } = data

        const getCoinGeckoIdForCoin = (symbol) => {
            const a = _.toLower(symbol)
            const found = _.find(list, _.matchesProperty('symbol', a))
            return found?.id
        }

        const underlying = _.filter(result, e => e.underlying).map(e => e.underlying)
        const listOfSingles = _.uniq(underlying)
        const resultsWithId = listOfSingles.map(r => ({
            ticker: r,
            coingeckoId: getCoinGeckoIdForCoin(r)
        }))
        const geckoIds = _.filter(resultsWithId, e => e.coingeckoId)
        const { data: markets } = await coingecko.coins.markets({
            ids: geckoIds.map(e => e.coingeckoId),
            vs_currencies: 'usd'
        })
        const imageDataRequests = markets.map(m => ({
            url: m.image,
            method: 'GET',
            responseType: 'stream',

        }))
        const requests = imageDataRequests.map(i => a(i))
        const responses = await Promise.all(requests)
        const writeImage = async (ticker, img) => {
            const p = path.resolve(__dirname, 'img', `${ticker}.png`)
            const writer = fs.createWriteStream(p)

            img.pipe(writer)

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve)
                writer.on('error', reject)
            }).finally(() => {
                writer.end()
            })
        }
        const imgRequests = []
        for (let index = 0; index < markets.length; index++) {
            const { symbol } = markets[index]
            const { data: img } = responses[index]
            imgRequests.push(writeImage(symbol, img))
        }

        const imgResponses = await Promise.all(imgRequests)
        console.log(imgResponses)

    }
    


}

main()