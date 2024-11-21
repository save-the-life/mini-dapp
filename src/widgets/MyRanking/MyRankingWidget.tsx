// src/widgets/MyRanking/MyRankingWidget.tsx

import React from 'react';
import Images from '@/shared/assets/images';
import { formatNumber } from '@/shared/utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { useNavigationStore } from '@/shared/store/navigationStore';
import { useUserStore } from '@/entities/User/model/userModel'; // useUserStore 임포트
import { useTranslation } from "react-i18next";

const MyRankingWidget: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setSelected = useNavigationStore((state) => state.setSelected);
  
  // useUserStore에서 필요한 데이터 가져오기
  const { rank, starPoints, lotteryCount, slToken } = useUserStore();

  // 디버깅: 현재 포인트 상태 확인
  React.useEffect(() => {
    console.log("MyRankingWidget - Current Points:", { rank, starPoints, lotteryCount, slToken });
  }, [rank, starPoints, lotteryCount, slToken]);

  const handleRankingClick = () => {
    setSelected('/rank');
    navigate('/rank');
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-white cursor-pointer"
      onClick={handleRankingClick}
    >
      <h1 className="font-jalnan text-3xl">{t("rank_page.Ranking")}</h1>
      <div className="bg-box mt-4 px-8 md:w-[595.95px] w-[332px] h-24 md:h-32 flex">
        {/* My Rank 섹션 */}
        <div className="w-[121px] h-full flex flex-col items-center justify-center gap-2">
          <p className="text-base font-semibold">{t("rank_page.My_Rank")}</p>
          <p className="text-2xl text-[#fde047] font-jalnan">
            {formatNumber(rank)}
          </p>
        </div>
        
        {/* 구분선 */}
        <div className="w-[1px] h-full flex items-center justify-center mx-6">
          <div className="bg-white h-16 w-full"></div>
        </div>
        
        {/* 스타, 추첨권, SL 토큰 섹션 */}
        <div className="w-full h-full flex flex-row items-center justify-around text-xs">
          {/* 스타 포인트 */}
          <div className="flex flex-col items-center justify-center gap-2">
            <img src={Images.Star} alt="star" className="w-6 h-6" />
            <p>{formatNumber(starPoints)}</p>
          </div>
          
          {/* 추첨권 */}
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={Images.LotteryTicket}
              alt="lottery-ticket"
              className="w-6 h-6"
            />
            <p>{formatNumber(lotteryCount)}</p>
          </div>
          
          {/* SL 토큰 */}
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={Images.TokenReward}
              alt="RankingSLToken"
              className="w-6 h-6"
            />
            <p>{formatNumber(slToken)}</p>
          </div>
        </div>
      </div>
      
      {/* 설명 텍스트 */}
      <p className="flex items-start justify-start w-full font-medium text-xs md:text-sm mt-2 px-2">
        {t("rank_page.*_Rankings_are_based_on_Star_Points")}
      </p>
    </div>
  );
};

export default MyRankingWidget;
