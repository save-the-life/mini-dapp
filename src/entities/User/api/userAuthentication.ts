import api from '@/shared/api/axiosInstance';

// 사용자 정보 검증
export const userAuthenticationWithServer = async (lineAccessToken: string): Promise<any> => {
    const response = await api.post('', {lineAccessToken});

    if(response.data.code === "OK"){

    }else{

    }
};

export default userAuthenticationWithServer;