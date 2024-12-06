import React, { useEffect, useState } from "react";
import { useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./shared/components/ui/scrollTop";
import liff from "@line/liff";
import userAuthenticationWithServer from "./entities/User/api/userAuthentication";
import { useUserStore } from "./entities/User/model/userModel";
import i18n from "./shared/lib/il8n";
import "./App.css";

// 페이지 컴포넌트들
import AIMenu from "@/pages/AIMenu";
import SelectCharacterPage from "./pages/SelectCharacter";
import DiceEvent from "@/pages/DiceEvent";
import WalletPage from "@/pages/WalletPage";
import MissionPage from "@/pages/MissionPage";
import Reward from "@/pages/RewardPage";
import InviteFriends from "@/pages/InviteFriends";
import SlotMachine from "@/pages/SlotMachine";
import PetRegister from "@/pages/PetRegister";
import SelectPet from "@/pages/SelectPet";
import EditPet from "@/pages/EditPet";
import DiagnosisRecords from "@/pages/DiagnosisList";
import DiagnosisDetail from "@/pages/DiagnosisDetail";
import AIXrayAnalysis from "@/pages/AIXrayAnalysis";
import DiceEventLayout from "./app/layout/DiceEventLayout";
import SplashScreen from "./app/components/SplashScreen";
import WalletList from "./pages/WalletList";
import MyAssets from "./pages/MyAssets";
import MyNfts from "./pages/MyNFTs";
import RewardHistory from "./pages/RewardHistory";
import PreviousRewards from "@/pages/PreviousRewards";


// QueryClient 설정
const queryClient = new QueryClient();

const App:React.FC = () =>{
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false); // 데이터 로딩 상태 추가
  const { fetchUserData, characterType } = useUserStore();


  useEffect(() => {
    const initializeApp = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        setIsLiffInitialized(true);

        const accessToken = localStorage.getItem("accessToken");
        console.log("로컬 액세스 토큰: ", accessToken);

        if (!accessToken) {
          // 로컬 스토리지 토큰이 없는 경우
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
          if (!idToken) {
            throw new Error("ID 토큰을 가져오지 못했습니다.");
          }

          console.log("ID Token: ", idToken);
          const isNewUser = await userAuthenticationWithServer(idToken);

          if (isNewUser) {
            console.log("신규 사용자: 캐릭터 선택 페이지로 이동");
            navigate("/choose-character");
          } else {
            console.log("기존 사용자: 사용자 데이터 확인 중...");
            await fetchUserData();
            setIsDataFetched(true); // 데이터 로딩 완료
          }
        } else {
          // 로컬 스토리지 토큰이 있는 경우
          console.log("로컬 스토리지에 토큰 존재, 사용자 데이터 확인 중...");
          await fetchUserData();
          setIsDataFetched(true); // 데이터 로딩 완료
        }
      } catch (error) {
        console.error("앱 초기화 중 오류:", error);
        alert("앱 초기화 중 오류가 발생했습니다. 다시 시도해주세요.");
        window.location.reload();
      } finally {
        setShowSplash(false); // 스플래시 화면 제거
      }
    };

    initializeApp();
  }, [fetchUserData, navigate]);

  useEffect(() => {
    if (isDataFetched) {
      if (characterType != null) {
        console.log("캐릭터 선택 완료:", characterType);
        navigate("/dice-event");
      } else {
        console.log("캐릭터 선택되지 않음, 캐릭터 선택 페이지로 이동");
        navigate("/choose-character");
      }
    }
  }, [isDataFetched, characterType, navigate]);

  // 스플래시 화면을 표시 중이거나 LIFF가 초기화되지 않았을 때
  if (showSplash || !isLiffInitialized) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Routes>
        {/* DiceEventLayout Pages */}
        <Route path="/dice-event" element={<DiceEventLayout><DiceEvent /></DiceEventLayout>} />
        <Route path="/AI-menu" element={<DiceEventLayout><AIMenu /></DiceEventLayout>} />
        <Route path="/mission" element={<DiceEventLayout><MissionPage /></DiceEventLayout>} />
        <Route path="/reward" element={<DiceEventLayout><Reward /></DiceEventLayout>} />
        <Route path="/invite-friends" element={<DiceEventLayout><InviteFriends /></DiceEventLayout>} />
        <Route path="/my-assets" element={<DiceEventLayout><MyAssets /></DiceEventLayout>} />
        <Route path="/wallet" element={<DiceEventLayout><WalletPage /></DiceEventLayout>} />
        <Route path="/wallet-list" element={<DiceEventLayout><WalletList /></DiceEventLayout>} />
        <Route path="/test" element={<DiceEventLayout><SlotMachine /></DiceEventLayout>} />
        <Route path="/previous-rewards" element={<DiceEventLayout><PreviousRewards /></DiceEventLayout>} />


        {/* Hidden Pages */}
        <Route path="/choose-character" element={<DiceEventLayout hidden={true}><SelectCharacterPage /></DiceEventLayout>} />
        <Route path="/select-pet" element={<DiceEventLayout hidden={true}><SelectPet /></DiceEventLayout>} />
        <Route path="/regist-pet" element={<DiceEventLayout hidden={true}><PetRegister /></DiceEventLayout>} />
        <Route path="/edit-pet" element={<DiceEventLayout hidden={true}><EditPet /></DiceEventLayout>} />
        <Route path="/diagnosis-list" element={<DiceEventLayout hidden={true}><DiagnosisRecords /></DiceEventLayout>} />
        <Route path="/diagnosis-detail" element={<DiceEventLayout hidden={true}><DiagnosisDetail /></DiceEventLayout>} />
        <Route path="/ai-xray-analysis" element={<DiceEventLayout hidden={true}><AIXrayAnalysis /></DiceEventLayout>} />
        <Route path="/my-nfts" element={<DiceEventLayout hidden={true}><MyNfts /></DiceEventLayout>} />
        <Route path="/reward-history" element={<DiceEventLayout hidden={true}><RewardHistory /></DiceEventLayout>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
