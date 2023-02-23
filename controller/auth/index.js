const supabase = require('../../api/supabase');

module.exports = {
    install: () => {
        return {
            storeInstallation: async (installation) => {
                // Bolt will pass your handler an installation object
                // Change the lines below so they save to your database
                if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
                    // handle storing org-wide app installation
                    console.log("storeInstallation", "isEnterpriseInstall", installation.enterprise.id)
                    // return await database.set(installation.enterprise.id, installation);
                }
                if (installation.team !== undefined) {
                    // single team app installation
                    return await supabase.uploadFile(installation);
                }
                throw new Error('Failed saving installation data to installationStore');
            },
            fetchInstallation: async (installQuery) => {
                // Bolt will pass your handler an installQuery object
                // Change the lines below so they fetch from your database
                if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
                    // handle org wide app installation lookup
                    console.log("fetchInstallation", "isEnterpriseInstall", installQuery.enterpriseId)
                    // return await database.get(installQuery.enterpriseId);
                }
                if (installQuery.teamId !== undefined) {
                    // single team app installation lookup
                    return await supabase.fetchFile(installQuery.teamId);
                }
                throw new Error('Failed fetching installation');
            },
            deleteInstallation: async (installQuery) => {
                // Bolt will pass your handler  an installQuery object
                // Change the lines below so they delete from your database
                if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
                    // org wide app installation deletion
                    console.log("deleteInstallation", "isEnterpriseInstall", installQuery.enterpriseId)
                    // return await database.delete(installQuery.enterpriseId);
                }
                if (installQuery.teamId !== undefined) {
                    // single team app installation deletion
                    return await supabase.deleteFile(installQuery.teamId);
                }
                throw new Error('Failed to delete installation');
            }
        }
    },
}