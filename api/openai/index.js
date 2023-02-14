const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY, });
const openai = new OpenAIApi(configuration);

module.exports = {
    completion: async (text, body) => {
        console.log("[OpenAI]", "completion", body.event.user, body.team_id)

        // Send request to OpenAI
        // console.info("[OpenAI]", text)
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Act as a person with super accurate knowledge based on facts. Answer questions given with interactive, casual and sometimes joking." + text,
            max_tokens: 300,
            user: `${body.team_id}/${body.event.user}`,
        });

        const reply = completion.data.choices[0].text.trim();

        console.log("[OpenAI]", reply, completion.data.usage.total_tokens);
        return reply;
    }
}