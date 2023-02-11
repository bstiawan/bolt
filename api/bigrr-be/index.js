const axios = require("axios");

axios.defaults.baseURL = process.env.BIGRR_BE_BASE_URL;
axios.defaults.headers.common['user_id'] = process.env.USER_ID;
axios.defaults.headers.common['token'] = process.env.TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {
    api: async function (method, url, data) {
        try {
            const response = await axios({
                method: method,
                url: url,
                data: data,
            });
            // console.info({ url: url, response: response.data.data });
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    }
}