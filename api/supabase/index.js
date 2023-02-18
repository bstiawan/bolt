const { createClient } = require('@supabase/supabase-js');

const supabaseClient = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_API_KEY)

module.exports = {
    fetchTeam: async (team_id) => {
        const { data, error } = await supabaseClient
            .from('teams')
            .select()
            .eq('team_id', team_id)
        if (data.length > 0) {
            console.log("[Supabase] fetchTeam", data[0].team_id, data[0].activated, data[0].credit)
            return data[0];
        } else if (data.length === 0 || error) {
            console.log("[Supabase] fetchTeam", error)
            return data[0];
        }
    },
    upsertTeam: async (payload) => {
        const { data, error } = await supabaseClient
            .from('teams')
            .upsert(payload, { onConflict: 'team_id' })
            .select()
        if (data.length > 0) {
            console.log("[Supabase] upsertTeam", data[0].team_id, data[0].activated, data[0].credit)
            return data[0];
        } else if (data.length === 0 || error) {
            console.log("[Supabase] upsertTeam", error)
            return data[0];
        }
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
    },
    insertQuestion: async (payload) => {
        const { data, error } = await supabaseClient
            .from('questions')
            .insert(payload)
        console.log("[Supabase] insertQuestion", data)
        if (error) {
            console.log("[Supabase] insertQuestion", error)
            return error;
        }
        return data;
    },
    uploadFile: async (payload) => {
        const { data, error } = await supabaseClient
            .storage
            .from('installation')
            .upload(`${payload.team.id}.json`, payload, {
                cacheControl: '3600',
                upsert: true
            })
        if (!error) {
            console.log("[Supabase] uploadFile", data)
            return data;
        }
    },
    fetchFile: async (team_id) => {
        const { data, error } = await supabaseClient
            .storage.from('installation')
            .download(`${team_id}.json`)
        if (!error) {
            console.log("[Supabase] fetchFile", data)
            return data;
        }
    },
    deleteFile: async (team_id) => {
        const { data, error } = await supabaseClient
            .storage.from('installation')
            .remove([`${team_id}.json`])
        if (!error) {
            console.log("[Supabase] deleteFile", data)
            return data;
        }
    }
}