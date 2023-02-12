
const NodeCache = require("node-cache");

const { getUserToken } = require('../../api/make');

// Cache
const cache = new NodeCache({ checkperiod: 259200 });

module.exports = {
    userTokenCache: async (email) => {
        console.log("Get userTokenCache: " + email)
        let userToken = cache.get(email);
        if (userToken == undefined) {
            console.error("userToken is undefined, fetching from API")
            // Fetch from API
            const result = await getUserToken(email);

            // Set cache
            cache.set(email, result, 259200)
            // console.log("userTokenCache result: " + JSON.stringify(result))
            userToken = result;
        }

        // console.log("userTokenCache: " + userToken)
        // console.log(cache.keys())
        return userToken;
    }
}