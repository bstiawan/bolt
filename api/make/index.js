const axios = require("axios");

module.exports = {
    getUserToken: async function (email) {
        console.log("Start getUserToken: " + email)
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
            // console.info("Success getUserToken: ", response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}