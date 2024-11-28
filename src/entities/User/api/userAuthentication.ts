import api from '@/shared/api/axiosInstance';

// 사용자 정보 검증
export const userAuthenticationWithServer = async (lineAccessToken: string): Promise<boolean | undefined> => {
    try {
        console.log("날려볼게");
        console.log("토큰: ", lineAccessToken);
        const lineData = {
            lineToken: lineAccessToken,
            channelId: '2006540121'
        }
        const response = await api.post('/auth/login', lineData);

        const { code, data } = response.data;
        const authorizationHeader = response.headers['authorization'];

        console.log("뭐요? ", response);

        if (code === "OK" && authorizationHeader) {
            // Bearer 접두사를 제거하여 액세스 토큰 추출
            const accessToken = authorizationHeader.replace('Bearer ', '');
            // 로컬 스토리지에 액세스 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            // isInitial 값 반환
            return data.isInitial;
        }
    } catch (error) {
        console.error("인증 중 오류 발생:", error);
    }
};

export default userAuthenticationWithServer;
