const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY, });
const openai = new OpenAIApi(configuration);

module.exports = {
    completion: async (text, body) => {
        console.info("openai", "completion", body.event.user, body.team_id)

        // Send request to openai
        console.info("openai", text)
        // const completion = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: text,
        //     max_tokens: 50,
        //     user: `${body.team_id}/${body.event.user}`,
        //     stop: [" Question:", " Answer:"]
        // });

        const reply = "completion.data.choices[0].text";

        console.log("openai", reply);
        return reply;
    }
}