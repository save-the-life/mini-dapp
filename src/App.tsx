import React, { useEffect, useState } from "react";
import { useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./shared/components/ui/scrollTop";
import liff from "@line/liff";
import userAuthenticationWithServer from "./entities/User/api/userAuthentication";
// import i18n from "./shared/lib/il8n";
import "./App.css";

// 페이지 컴포넌트들
import AIMenu from "@/pages/AIMenu";
import SelectCharacterPage from "./pages/SelectCharacter";
import DiceEvent from "@/pages/DiceEvent";
import WalletPage from "@/pages/WalletPage";
import MissionPage from "@/pages/MissionPage";
import RankPage from "@/pages/RankPage";
import MiniGame from "@/pages/MiniGame";
import InviteFriends from "@/pages/InviteFriends";
import SlotMachine from "@/pages/SlotMachine";
import PetRegister from "@/pages/PetRegister";
import SelectPet from "@/pages/SelectPet";
import EditPet from "@/pages/EditPet";
import DiagnosisRecords from "@/pages/DiagnosisList";
import DiagnosisDetail from "@/pages/DiagnosisDetail";
import MyPoint from "@/pages/MyPoint";
import AIXrayAnalysis from "@/pages/AIXrayAnalysis";
import DiceEventLayout from "./app/layout/DiceEventLayout";
import SplashScreen from "./app/components/SplashScreen";
import WalletList from "./pages/WalletList";

// QueryClient 설정
const queryClient = new QueryClient();

const App:React.FC = () =>{
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        setShowSplash(true);
        setIsLiffInitialized(true);

        const accessToken = localStorage.getItem('accessToken');
        console.log("토큰 : ", accessToken);

        if(!accessToken){
          // 로컬 스토리지 토큰이 없는 경우
          if (!liff.isLoggedIn()) {
            liff.login();
            return;
          }

          // 로그인 후 사용자 정보 가져오기
          const profile = await liff.getProfile();
          const lineAccessToken = liff.getAccessToken();

          if (lineAccessToken) {
            console.log("id: ", profile.userId);
            console.log("name: ", profile.displayName);
            console.log("token: ", lineAccessToken);

            // try {
            //   // 사용자 인증 서버 요청
            //   const response = await userAuthenticationWithServer(
            //     profile.userId,
            //     profile.displayName,
            //     lineAccessToken
            //   );

            //   if (response.isNewUser) {
            //     // 신규 사용자 처리 (회원가입 로직 및 토큰 저장)
            //     console.log("신규 사용자, 회원가입 진행");
            //   } else {
            //     // 기존 사용자 처리 (로그인 및 토큰 저장)
            //     console.log("기존 사용자, 토큰 발급");

            //   }

            //   // 액세스 토큰 발급 후 다음 단계로 이동
            //   navigate("/dice-event");
            // } catch (authError) {
            //   console.error("사용자 인증 실패:", authError);
            //   // 인증 실패 처리
            // }
          }
        }else{
          // 로컬 스토리지 토큰이 존재하는 경우
          navigate("/dice-event");
        }
      } catch (error) {
        console.error("초기화 실패:", error);
        window.location.reload();
      } finally {
        setShowSplash(false); // 모든 작업 종료 후 스플래시 제거
      }
    };

    initializeApp();
  }, []);

  // 스플래시 화면을 표시 중이거나 LIFF가 초기화되지 않았을 때
  if (showSplash || !isLiffInitialized) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Routes>
        <Route path="/AI-menu" element={<DiceEventLayout><AIMenu /></DiceEventLayout>} />
        <Route path="/choose-character" element={<DiceEventLayout hidden={true}><SelectCharacterPage /></DiceEventLayout>} />
        <Route path="/dice-event" element={<DiceEventLayout><DiceEvent /></DiceEventLayout>} />
        <Route path="/mission" element={<DiceEventLayout><MissionPage /></DiceEventLayout>} />
        <Route path="/wallet" element={<DiceEventLayout><WalletPage /></DiceEventLayout>} />
        <Route path="/wallet-list" element={<DiceEventLayout><WalletList /></DiceEventLayout>} />
        <Route path="/rank" element={<DiceEventLayout><RankPage /></DiceEventLayout>} />
        <Route path="/mini-game" element={<DiceEventLayout><MiniGame /></DiceEventLayout>} />
        <Route path="/invite-friends" element={<DiceEventLayout><InviteFriends /></DiceEventLayout>} />
        <Route path="/test" element={<DiceEventLayout><SlotMachine /></DiceEventLayout>} />
        <Route path="/regist-pet" element={<DiceEventLayout hidden={true}><PetRegister /></DiceEventLayout>} />
        <Route path="/select-pet" element={<DiceEventLayout hidden={true}><SelectPet /></DiceEventLayout>} />
        <Route path="/edit-pet" element={<DiceEventLayout hidden={true}><EditPet /></DiceEventLayout>} />
        <Route path="/diagnosis-list" element={<DiceEventLayout hidden={true}><DiagnosisRecords /></DiceEventLayout>} />
        <Route path="/diagnosis-detail" element={<DiceEventLayout hidden={true}><DiagnosisDetail /></DiceEventLayout>} />
        <Route path="/ai-xray-analysis" element={<DiceEventLayout hidden={true}><AIXrayAnalysis /></DiceEventLayout>} />
        <Route path="/my-point" element={<DiceEventLayout hidden={true}><MyPoint /></DiceEventLayout>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
