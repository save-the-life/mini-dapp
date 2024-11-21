import React, { useEffect, useState } from 'react';
import Images from '@/shared/assets/images';
import { useNavigate } from 'react-router-dom';
import { useNavigationStore } from '@/shared/store/navigationStore';
import getLeaderBoard from '@/entities/User/api/getLeaderBoard';
import { useTranslation } from "react-i18next";

const MyRankingWidget: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setSelected = useNavigationStore((state) => state.setSelected);
  const [myRank, setMyRank] = useState({
    rank: 0,
    star: 0,
    ticket: 0,
    slToken: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeaderBoard();
        setMyRank(data.myRank);
      } catch (error) {
        console.error('Failed to load ranking data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRankingClick = () => {
    setSelected('/rank');
    navigate('/rank');
  };

  return (
    <div
      className=" flex flex-col items-center justify-center text-white cursor-pointer "
      onClick={handleRankingClick}
    >
      <h1 className="font-jalnan text-3xl">{t("rank_page.Ranking")}</h1>
      <div className="bg-box mt-4  px-8 md:w-[595.95px] w-[332px] h-24 md:h-32 flex">
        <div className="w-[121px] h-full flex flex-col items-center justify-center gap-2">
          <p className="text-base font-semibold">{t("rank_page.My_Rank")}</p>
          <p className="text-2xl text-[#fde047] font-jalnan">
            {myRank.rank}
          </p>
        </div>
        <div className="w-[1px] h-full flex items-center justify-center mx-6">
          <div className="bg-white h-16 w-full"></div>
        </div>
        <div className="w-full h-full flex flex-row items-center justify-around text-xs">
          <div className="flex flex-col items-center justify-center gap-2">
            <img src={Images.Star} alt="star" className="w-6 h-6" />
            <p>{myRank.star}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={Images.LotteryTicket}
              alt="lottery-ticket"
              className="w-6 h-6"
            />
            <p>{myRank.ticket}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={Images.RankingSLToken}
              alt="RankingSLToken"
              className="w-6 h-6"
            />
            <p>{myRank.slToken}</p>
          </div>
        </div>
      </div>
      <p className=" flex items-start justify-start w-full font-medium text-xs md:text-sm mt-2 px-2   ">
        {t("rank_page.*_Rankings_are_based_on_Star_Points")}
      </p>
    </div>
  );
};

export default MyRankingWidget;
