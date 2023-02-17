const { createClient } = require('@supabase/supabase-js');

const supabaseClient = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_API_KEY)

module.exports = {
    fetchTeam: async (team_id) => {
        const { data, error } = await supabaseClient
            .from('teams')
            .select()
            .eq('team_id', team_id)
        console.log("[Supabase] fetchTeam", data[0].team_id, data[0].activated, data[0].credit)

        if (data.length === 0 || error) {
            console.log("[Supabase] fetchTeam", error)
            return data[0];
        }
        return data[0];
    },
    upsertTeam: async (payload) => {
        const { data, error } = await supabaseClient
            .from('teams')
            .upsert(payload, { onConflict: 'team_id' })
            .select()
        console.log("[Supabase] upsertTeam", data[0].team_id, data[0].activated, data[0].credit)
        if (data.length === 0 || error) {
            console.log("[Supabase] upsertTeam", error)
            return data[0];
        }
        return data[0];
    },
    insertLicense: async (payload) => {
        const { data, error } = await supabaseClient
            .from('licenses')
            .insert(payload)
        console.log("[Supabase] insertLicense", data)
        if (error) {
            console.log("[Supabase] insertLicense", error)
            return error;
        }
        return data;
    }
}