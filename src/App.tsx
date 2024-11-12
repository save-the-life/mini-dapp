import React, { useEffect, useState } from "react";
import { useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import liff from "@line/liff";
import "./App.css";

// 페이지 컴포넌트들
import Home from "@/pages/Home";
import SignUpPage from "./pages/SignUp";
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
  const [error, setError] = useState("");

  useEffect(() => {
    // LIFF 초기화
    liff
      .init({ liffId: import.meta.env.VITE_LIFF_ID })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          setShowSplash(true); // 로그인 후 스플래시 화면 표시
          setIsLiffInitialized(true); // LIFF 초기화 완료 상태

           // 로그인한 사용자 정보를 가져와 출력
           liff.getProfile()
           .then(profile => {
             console.log("사용자 ID:", profile.userId);
             console.log("사용자 이름:", profile.displayName);
             console.log("accessToken", liff.getAccessToken());
           })
           .catch(err => {
             console.error("사용자 정보 가져오기 실패:", err);
           });

          // 일정 시간 후 페이지 이동 (예: 홈 페이지)
          setTimeout(() => {
            setShowSplash(false); // 스플래시 화면 숨기기
            navigate("/sign-up");
          }, 3000); // 3초 동안 스플래시 화면 표시 후 페이지 이동
        }
      })
      .catch((err: Error) => {
        setError(`LIFF init failed: ${err.message}`);
        setIsLiffInitialized(false); // 초기화 실패 상태
      });
  },[]);

  // 초기화 실패 메시지
  if (error) {
    return <div>Error: {error}</div>;
  }

  // 스플래시 화면을 표시 중이거나 LIFF가 초기화되지 않았을 때
  if (showSplash || !isLiffInitialized) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/home" element={<DiceEventLayout><Home /></DiceEventLayout>} />
          <Route path="/sign-up" element={<DiceEventLayout hidden={true}><SignUpPage /></DiceEventLayout>} />
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
