const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/45EbSEwPjqpYHI15v-mXRKFCOOHClzCD");

module.exports = async (req, res) => {
    const { address } = req.query;
    if (web3.utils.isAddress(address)) {
        const balance = await web3.alchemy.getTokenBalances(address, "DEFAULT_TOKENS")
        // const balance = web3.utils.fromWei(balanceRaw)
        res.status(200).send({ balance });

    } else {
        res.status(400).send({ error: 'Invalid Address' });
    }
}