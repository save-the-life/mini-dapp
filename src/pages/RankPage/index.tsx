import { TopTitle } from '@/shared/components/ui';
import React, { useEffect, useState } from 'react';
import MyRankingWidget from '@/widgets/MyRanking/MyRankingWidget';
import './RankPage.css';
import Images from '@/shared/assets/images';
import getLeaderBoard from '@/entities/User/api/getLeaderBoard';
import getRanking from '@/entities/User/api/getRanking';
import { useTranslation } from "react-i18next";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
interface Leader {
  userId: string;
  starCount: number;
}

const RankPage: React.FC = () => {
  const { t } = useTranslation();
  const [leaderBoard, setLeaderBoard] = useState<Leader[]>([]);
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const [error, setError] = useState<string | null>(null);
  const [thisMonth, setThisMonth] = useState({
    year: 0,
    month: 1,
    prize: "Not this time~"
  });
  const [nextMonth, setNextMonth] = useState({
    year: 0,
    month: 2,
    prize: "Not this time~"
  })


  
  useEffect(()=>{
    const fetchData = async () => {
      try{
        // 월별 보상 정보 확인
        const prizeData = await getLeaderBoard();
        setThisMonth(prizeData.thisMonth);
        setNextMonth(prizeData.nextMonth);

        // 리더보드
        const leaderBoardData = await getRanking(page);
        // setLeaderBoard(leaderBoardData);

      } catch (error){
        console.error('Failed to load ranking data:', error);
      }
    };
    
    fetchData();
  },[]);

  return (
    <div className="flex flex-col text-white mx-6 mb-44 min-h-screen">
      <TopTitle title="Rankings" />
      <MyRankingWidget />
      <div className=" mt-7 flex flex-col items-center">
        <h1 className="font-jalnan text-3xl mb-4">{t("rank_page.Leader_Board")}</h1>
        {/**1~3등 컴포넌트 */}
        <div className="flex flex-col gap-3 md:w-[595.95px] w-[332px] justify-center items-center">
          <div className=" h-16 w-full rounded-3xl first-to-third-pace-box flex flex-row items-center justify-around">
            <div className="flex flex-row gap-4 text-lg font-medium items-center">
              <p>1</p>
              <p>medpro1@gamil.com</p>
            </div>
            <p className="text-[#fde047] font-semibold text-xl">2,456</p>
          </div>
        </div>

        {/**4등 이후 컴포넌트 */}
        <div className="flex flex-col gap-3 md:w-[595.95px] w-[332px] justify-center items-center mt-8">
          <div className=" h-16 w-full flex flex-row items-center justify-between border-b">
            <p>4</p>
            <p>medpro1@gamil.com</p>
            <p className=" font-semibold text-lg">2,456</p>
          </div>
        </div>

        <button className=" border rounded-full mt-6 flex items-center justify-center w-[66px] h-7 font-medium text-xs mb-8">
          {' '}
          {t("asset_page.View_All")}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center  gap-4">
        <h1 className="font-jalnan text-3xl mb-4 w-full text-center">
          {t(`rank_page.month.${monthNames[thisMonth.month - 1]}`)} {t("rank_page.Campaign_Prize")}
        </h1>
        <div className=" md:w-[595.95px] w-[332px]  h-60 bg-[#2E3364B2] flex flex-col rounded-3xl  items-center justify-center gap-3 border-2 border-[#3937A3]">
          <img
            src={Images.PrizeImage}
            alt="prize-image"
            className=" w-32 h-32"
          />
          <p className="text-white font-semibold text-center">{thisMonth.prize}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  gap-4 mt-10">
        <h1 className="font-jalnan text-3xl mb-4 w-full text-center">
          {t(`rank_page.month.${monthNames[nextMonth.month - 1]}`)} {t("rank_page.Campaign_Prize")}
        </h1>
        <div className=" md:w-[595.95px] w-[332px]  h-60 bg-[#2E3364B2] flex flex-col rounded-3xl  items-center justify-center gap-3 border-2 border-[#3937A3]">
          <img
            src={Images.PrizeImage}
            alt="prize-image"
            className=" w-32 h-32"
          />
          <p className="text-white font-semibold text-center">{thisMonth.prize}</p>
        </div>
      </div>
    </div>
  );
};

export default RankPage;
