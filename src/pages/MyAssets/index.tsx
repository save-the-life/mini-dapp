import React from "react";
import { useNavigate } from "react-router-dom";
import { BiWallet } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Images from '@/shared/assets/images';

const MyAssets: React.FC = () => {
  const navigate = useNavigate();

  // 더미 데이터
  const userInfo = {
    email: "Nick@gmail.com",
    level: 1,
    profileImage:
      "https://via.placeholder.com/50", // 프로필 이미지 URL
  };

  const nftCollection = [
    { id: 1, name: "Cool Cat #1", image: "https://via.placeholder.com/100" },
    { id: 2, name: "Cool Cat #1", image: "https://via.placeholder.com/100" },
    { id: 3, name: "Cool Cat #1", image: "https://via.placeholder.com/100" },
    { id: 4, name: "Cool Cat #1", image: "https://via.placeholder.com/100" },
  ];

  const rewardHistory = [
    { id: 1, description: "Joined Telegram", date: "17-10-2024", points: "+150SL" },
    { id: 2, description: "AI Dental Examination", date: "17-10-2024", points: "-150SL" },
    { id: 3, description: "Subscribe to Email", date: "17-10-2024", points: "+150SL" },
    { id: 4, description: "Game Win", date: "17-10-2024", points: "+150P" },
    { id: 5, description: "Game Lose", date: "17-10-2024", points: "-150P" },
  ];

  return (  
    <div className="flex flex-col items-center text-white mx-6 relative min-h-screen pb-32">
        {/* 상단 사용자 정보 */}
        <div className="flex items-center justify-between w-full mt-6">
            <div className="flex items-center">
                <img
                    src={userInfo.profileImage}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                    <p className="text-sm font-bold">{userInfo.email}</p>
                    <p className="text-sm text-red-500">Lv.{userInfo.level}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    onClick={()=>navigate('/wallet')}>
                    <BiWallet className="w-6 h-6" />
                </button>
                {/* <button 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    onClick={()=>navigate('/')}>
                    <IoSettingsOutline className="w-6 h-6" />
                </button> */}
            </div>
        </div>

        {/* 공지 영역 */}
        <div 
            className="rounded-2xl p-4 mt-6 w-full flex items-center justify-between"
            style={{
                background: "linear-gradient(to bottom, #19203CB2 0%, #304689 100%)",
            }}>
            {/* 공지 텍스트 */}
            <div>
                <h3 className="text-lg font-semibold">Shop Unique NFTs Now!</h3>
                <p className="text-sm text-gray-200">
                Start collecting rare and 
                </p>
                <p className="text-sm text-gray-200">
                unique digital assets today!
                </p>
            </div>
            {/* 공지 이미지 */}
            <img
                src={Images.cart}
                alt="Shop NFTs"
                className="w-20 h-20"
            />
        </div>


        {/* NFT 컬렉션 */}
        <div className="mt-10 w-full">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">My NFT Collection</h2>
                <button
                    className="flex items-center text-white text-sm"
                    onClick={() => navigate("/my-nfts")}
                >
                    View All <FaChevronRight className="ml-1 w-4 h-4" />
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 w-full max-w-[1200px] mx-auto px-4">
                {nftCollection.map((nft) => (
                    <div
                        key={nft.id}
                        className="bg-[#1F1E27] border border-[#737373] p-2 rounded-xl flex flex-col items-center"
                        >
                        <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-28 h-28 rounded-md mt-1 mx-1"
                        />
                        <p className="mt-2 font-bold">{nft.name}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* 보상 내역 */}
        <div className="mt-10 w-full">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Rewards History</h2>
                <button
                    className="flex items-center text-white text-sm"
                    onClick={() => navigate("/reward-history")}
                >
                    View All <FaChevronRight className="ml-1 w-4 h-4" />
                </button>
            </div>
            <div className="mt-4 bg-[#1F1E27] rounded-lg border border-[#35383F] p-4">
                {rewardHistory.map((reward) => (
                    <div
                        key={reward.id}
                        className="flex justify-between items-center py-2 border-b border-[#35383F]"
                        >
                        <div>
                            <p className="text-sm font-medium">{reward.description}</p>
                            <p className="text-xs text-gray-400">{reward.date}</p>
                        </div>
                        <p
                            className={`text-sm font-bold ${
                            reward.points.startsWith("+") ? "text-blue-400" : "text-red-400"
                            }`}
                        >
                            {reward.points}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default MyAssets;
