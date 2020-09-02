import clients from '../../../common/clients';


export const AccountMasterAction = {


    getAccountMasterList: async () => {
        try {
            const response = await clients.axiosAPI.post('/ListAccount.php');
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }

    },

    deleteAccountMasterList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/DeleteAccount.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    addAccountMasterList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/AddAccount.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },

    editAccountMasterList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/EditAccount.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },


}
