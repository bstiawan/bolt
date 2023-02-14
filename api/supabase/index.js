const { createClient } = require('@supabase/supabase-js');

const supabaseClient = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_API_KEY)

module.exports = {
    fetchTeam: async (team_id) => {
        const { data, error } = await supabaseClient
            .from('users')
            .select()
            .eq('team_id', team_id)
        console.log("supabase fetchTeam", data, error)

        if (data.length === 0 || error) {
            return data[0];
        }
        return data[0];
    },
    upsertTeam: async (team_id) => {
        const { data, error } = await supabaseClient
            .from('users')
            .upsert({ team_id: team_id })
            .select()
        console.log("supabase upsertTeam", data, error)
    }
}