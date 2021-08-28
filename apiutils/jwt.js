const jwks = require('jwks-rsa')
const jwt = require('jsonwebtoken')

const {
    JWKS_URL,
    REACT_APP_AUTH0_AUDIENCE: AUTH0_AUDIENCE,
    REACT_APP_AUTH0_DOMAIN: AUTH0_DOMAIN
} = process.env

const client = jwks({
    jwksUri: JWKS_URL,
    timeout: 4000 // Defaults to 30s,
    
});

function getKey(header, callback){
    client.getSigningKey(header.kid, function(err, key) {
        if (err) {
            console.error('Error getting JWKS Keys.', err)
        }
        let signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

const verify = token => new Promise((resolve, reject) => {
    const options = {
        audience: AUTH0_AUDIENCE,
        issuer: `https://${AUTH0_DOMAIN}/`,
        algorithms: 'RS256'
    }
    jwt.verify(token, getKey, options, function(err, decoded) {
        if (err) {
            reject(err)
        } else {
            resolve(decoded)
        }
    });
})

module.exports = async (req) => {
    try {
        let token = req.headers['authorization']
        if (token) {
            token = token.substr(7)
            const decoded = await verify(token)
            return decoded
        } else {
            return null
        }
    } catch (err) {
        console.error('Error validating JWT.', err)
        return null
    }
}