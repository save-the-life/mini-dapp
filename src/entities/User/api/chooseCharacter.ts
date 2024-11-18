import api from '@/shared/api/axiosInstance';

export const chooseCharacter = async(type: string): Promise<any> => {
    const response = await api.post("", {type});

    if(response.data.code === "OK"){
        return true;
    }else{
        
    }
};

export default chooseCharacter;