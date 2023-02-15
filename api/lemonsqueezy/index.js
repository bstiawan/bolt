const axios = require("axios");

axios.defaults.baseURL = process.env.LEMONSQUEEZY_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {
    licenseKey: async function (key) {

        try {
            const response = await axios({
                method: 'get',
                url: '/license-keys/' + key,
                headers: {
                    'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
                }
            });
            console.info(response.data);
            return response.data;
        } catch (error) {
            // console.log(error.response.data);
            console.error(error);
            return error;
        }
    },
    activate: async function (key, team_id) {

        try {
            const response = await axios({
                method: 'post',
                url: 'licenses/activate',
                data: {
                    "license_key": key,
                    "instance_name": team_id
                },
            });
            console.log("[LemonSqueezy] License activated", response.data.meta.variant_name, response.data.meta.customer_name)
            return response.data;
        } catch (error) {
            // console.error(error.response.data);
            console.log("[LemonSqueezy] Error", error.response.data.error)
            return error.response.data;
        }
    },
}