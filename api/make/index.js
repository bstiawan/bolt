const axios = require("axios");

module.exports = {
    getUserToken: async function (email) {
        try {
            const response = await axios({
                method: "get",
                baseURL: process.env.MAKE_BASE_URL,
                url: "/geqh22x29b1w21bgkujadye7fk9zw7p3",
                params: {
                    "email": email,
                    "apikey": process.env.MAKE_API_KEY
                }
            });
            // console.info({ url: url, response: response.data.data });
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    }
}