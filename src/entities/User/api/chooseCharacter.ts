import api from '@/shared/api/axiosInstance';

// 사용자의 캐릭터 선택 API 
export const chooseCharacter = async(type: string): Promise<any> => {
    const response = await api.post("", {type});

    if(response.data.code === "OK"){
        return true;
    }else{

    }
};

export default chooseCharacter;