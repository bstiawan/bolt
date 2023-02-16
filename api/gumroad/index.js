const axios = require("axios");

axios.defaults.baseURL = process.env.PAYMENT_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {
    verifyLicense: async function (key, team_id) {
        console.log("[Gumroad] License verify", key, team_id)

        try {
            const response = await axios({
                method: 'post',
                url: '/licenses/verify',
                data: {
                    "license_key": key,
                    "product_id": process.env.PAYMENT_PRODUCT_ID
                },
            });
            console.log("[Gumroad] License verify", response.data.purchase.variants, response.data.purchase.email)
            return response.data;
        } catch (error) {
            // console.error(error.response.data);
            console.log("[Gumroad] Error", error.response.data.error)
            return error.response.data;
        }
    },
}