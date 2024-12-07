import React, { useEffect, useRef, useState } from "react";
import liff from "@line/liff";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/entities/User/model/userModel";
import userAuthenticationWithServer from "@/entities/User/api/userAuthentication";
import i18n from "@/shared/lib/il8n";
import SplashScreen from "./SplashScreen";

interface AppInitializerProps {
  onInitialized: () => void;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ onInitialized }) => {
  const navigate = useNavigate();
  const { fetchUserData, characterType } = useUserStore();
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // 한 번만 실행되도록 제어하기 위한 ref
  const initializedRef = useRef(false);

  useEffect(() => {
    const initializeApp = async () => {
      if (initializedRef.current) return;
      initializedRef.current = true;

      try {
        // LIFF 초기화
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        
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

        const accessToken = localStorage.getItem("accessToken");
        console.log("로컬 액세스 토큰 확인: ", accessToken);

        if (accessToken) {
          // 토큰이 존재하면 사용자 데이터 가져오기
          await fetchUserData();
          // fetchUserData() 이후 characterType 상태가 업데이트됨
        } else {
          // 토큰이 없는 경우 라인 로그인 진행
          if (!liff.isLoggedIn()) {
            liff.login();
            return;
          }

          const idToken = liff.getIDToken();
          if (!idToken) throw new Error("ID 토큰을 가져오지 못했습니다.");

          console.log("라인 ID Token 확인 : ", idToken);

          // userAuthenticationWithServer는 isInitial(신규/기존) 여부만 반환 (boolean | undefined)
          const isInitial = await userAuthenticationWithServer(idToken);

          if (isInitial === undefined) {
            // 인증 실패 또는 에러 처리
            throw new Error("사용자 인증에 실패했습니다.");
          } else if (isInitial === true) {
            // 신규 사용자 -> 캐릭터 선택 페이지로 이동
            // 여기서는 characterType 갱신 없이 바로 이동 (characterType은 null 상태)
            console.log("신규 사용자: 캐릭터 선택 페이지로 이동");
            navigate("/choose-character");
          } else {
            // 기존 사용자
            // 기존 사용자이므로 토큰 발급 완료
            // 이제 fetchUserData를 통해 characterType 가져오기
            console.log("기존 사용자: 사용자 데이터 확인 중...");
            await fetchUserData();
          }
        }
      } catch (error) {
        console.error("앱 초기화 중 오류:", error);
        alert("앱 초기화 중 오류가 발생했습니다. 다시 시도해주세요.");
        // window.location.reload();
      } finally {
        setIsInitialized(true);
        setShowSplash(false);
        onInitialized();
      }
    };

    initializeApp();
  }, [fetchUserData, onInitialized, navigate]);

  useEffect(() => {
    // isInitialized가 true일 때 캐릭터 타입 상태에 따라 페이지 이동
    if (isInitialized) {
      // 신규 사용자는 위에서 바로 "/choose-character"로 이동하므로 아래 로직에선 기존 사용자만 고려
      if (characterType === null) {
        console.log("기존 사용자이나 캐릭터 미선택, 캐릭터 선택 페이지로 이동");
        navigate("/choose-character");
      } else {
        console.log("캐릭터 선택 완료:", characterType);
        navigate("/dice-event");
      }
    }
  }, [isInitialized, characterType, navigate]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return null;
};

export default AppInitializer;
