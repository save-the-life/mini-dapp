import api from '@/shared/api/axiosInstance';

// 사용자 정보 검증 => 신규 or 기존 유저
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