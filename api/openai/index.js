const { Configuration, OpenAIApi } = require("openai");
const supabase = require('../supabase');

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY, });
const openai = new OpenAIApi(configuration);

const message = require('../../view/message');

module.exports = {
    completion: async (text, body) => {
        console.log("[OpenAI]", "completion", body.event.user, body.team_id)
        // console.log(body)
        const ts = body.event.ts;
        console.log("[OpenAI]", "completion", ts)

        const credit = body.auth.credit;

        if (credit > 0) {

            // Send request to OpenAI
            // console.info("[OpenAI]", text)
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: "Act as a person with super accurate knowledge based on facts. Answer questions given with interactive, casual and sometimes joking." + text + "Your answer:",
                max_tokens: 300,
                user: `${body.team_id}/${body.event.user}`,
            });

            const reply = completion.data.choices[0].text.trim();
            console.log("[OpenAI]", reply, completion.data.usage.total_tokens);

            // Continue deduct 1 credit
            console.log("[OpenAI]", body.auth.team_id, 'deduct', 1)
            await supabase.upsertTeam({ team_id: body.auth.team_id, credit: credit - 1 });
            return message.answerMessage(ts, reply);
        } else {
            return message.noCreditMessage(ts, "Sorry, you don't have enough credit", body.team_id);
        }
    }
}