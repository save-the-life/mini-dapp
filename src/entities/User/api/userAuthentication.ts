import api from '@/shared/api/axiosInstance';

export const userAuthenticationWithServer = async (userId: string, userName: string, lineAccessToken: string): Promise<any> => {
    const userData = {
        id : userId,
        name : userName,
        token: lineAccessToken
    }

    const response = await api.post('', {userData});

    if(response.data.code === "OK"){
        
    }else{

    }
};

export default userAuthenticationWithServer;