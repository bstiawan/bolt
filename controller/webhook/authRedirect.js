module.exports = {
    authRedirect: (req, app) => {
        console.log(req.url)

        const data = req.body;

        console.log(data);

        // Check signing secret first

    }
}