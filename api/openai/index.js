const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    completion: async (text, user) => {
        console.info("openai", "completion", user)
        console.info("openai", text)
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 50,
            user: user,
            stop: [" Question:", " Answer:"]
        });

        console.log("openai", completion.data.choices[0].text);
        return completion.data.choices[0].text;
    }
}