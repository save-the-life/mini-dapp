import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";

const RewardHistory: React.FC = () => {
    const navigate = useNavigate();


    const rewardHistory = [
        { id: 1, description: "Joined Telegram", date: "17-10-2024", points: "+150SL" },
        { id: 2, description: "AI Dental Examination", date: "17-10-2024", points: "-150SL" },
        { id: 3, description: "Subscribe to Email", date: "17-10-2024", points: "+150SL" },
        { id: 4, description: "Game Win", date: "17-10-2024", points: "+150P" },
        { id: 5, description: "Game Lose", date: "17-10-2024", points: "-150P" },
    ];

    return (
        <div className="flex flex-col text-white mb-32  mx-1 md:min-w-[600px] min-h-screen">
            <div className="flex items-center w-full mt-3 mb-2 relative">
                {/* 뒤로가기 버튼 */}
                <FaChevronLeft
                    className="text-xl cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <h1 className="text-xl font-bold flex-grow text-center">Rewards History</h1>
                <div className="w-6"></div>
            </div>

            {/* 보상 내역 */}
            <div className="w-full mr-32">
                <div className="mt-4 p-4">
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

export default RewardHistory;