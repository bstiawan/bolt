const axios = require("axios");
const NodeCache = require("node-cache");

const { userTokenCache } = require('../../api/cache');

axios.defaults.baseURL = process.env.BIGRR_BE_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Cache
const cache = new NodeCache();

module.exports = {
    api: async function (req) {

        // Get user token from make
        const userToken = await userTokenCache(req.email);

        try {
            console.log(req.method + " " + req.url)
            const response = await axios({
                method: req.method,
                url: req.url,
                data: req.data,
                headers: {
                    'user_id': userToken.user_id,
                    'token': userToken.token
                }
            });
            console.info(req.url, response.data.status, response.data.message);
            return response.data;
        } catch (error) {
            // console.log(error.response.data);
            console.error(req.url, error.response.data.status, error.response.data.message);
            return error.response.data;
        }
    }
}