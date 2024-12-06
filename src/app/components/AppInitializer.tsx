import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";
import userAuthenticationWithServer from "@/entities/User/api/userAuthentication";
import { useUserStore } from "@/entities/User/model/userModel";
import i18n from "@/shared/lib/il8n";
import SplashScreen from "./SplashScreen";

interface AppInitializerProps {
  onInitialized: () => void;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ onInitialized }) => {
  const navigate = useNavigate();
  const { fetchUserData, characterType } = useUserStore();
  const [showSplash, setShowSplash] = useState(true); // 스플래시 상태
  const [isInitialized, setIsInitialized] = useState(false); // 초기화 완료 상태

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // LIFF 초기화
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

        const accessToken = localStorage.getItem("accessToken");
        console.log("로컬 액세스 토큰: ", accessToken);

        if (!accessToken) {
          // 토큰이 없는 경우 라인 로그인 및 인증 처리
          if (!liff.isLoggedIn()) {
            liff.login();
            return;
          }

          // 언어 설정
          const userLanguage = liff.getLanguage();
          const languageMap: { [key: string]: string } = {
            "ko-KR": "ko",
            "en-US": "en",
            "ja-JP": "ja",
            "zh-TW": "zh",
          };
          const i18nLanguage = languageMap[userLanguage] || "en";
          i18n.changeLanguage(i18nLanguage);

          const idToken = liff.getIDToken();
          const linetoken = liff.getAccessToken();
          if (!linetoken) throw new Error("ID 토큰을 가져오지 못했습니다.");

          console.log("ID Token: ", idToken);

          const isNewUser = await userAuthenticationWithServer(linetoken);

          if (isNewUser) {
            console.log("신규 사용자: 캐릭터 선택 페이지로 이동");
            navigate("/choose-character");
          } else {
            console.log("기존 사용자: 토큰 발급 후 사용자 데이터 확인 중...");
            // 로그인 후 fetchUserData() 호출
            await fetchUserData();
          }
        } else {
          console.log("로컬 스토리지에 토큰 존재, 사용자 데이터 확인 중...");
          // 액세스 토큰이 존재하는 경우 fetchUserData() 호출
          await fetchUserData();
        }
      } catch (error) {
        console.error("앱 초기화 중 오류:", error);
        alert("앱 초기화 중 오류가 발생했습니다. 다시 시도해주세요.");
        window.location.reload();
      } finally {
        setIsInitialized(true); // 초기화 완료 상태 설정
        setShowSplash(false); // 스플래시 화면 제거
        onInitialized(); // 초기화 완료 콜백 호출
      }
    };

    initializeApp();
  }, [fetchUserData, navigate, onInitialized]);

  // `characterType` 상태 변화에 따른 라우팅 처리
  useEffect(() => {
    if (isInitialized) {
      if (characterType != null) {
        console.log("캐릭터 선택 완료:", characterType);
        navigate("/dice-event");
      } else {
        console.log("캐릭터 선택되지 않음, 캐릭터 선택 페이지로 이동");
        navigate("/choose-character");
      }
    }
  }, [isInitialized, characterType, navigate]);

  // 스플래시 화면 렌더링
  if (showSplash) {
    return <SplashScreen />;
  }

  return null; // 초기화 완료 후 컴포넌트 제거
};

export default AppInitializer;
