import React from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';

const MyNfts: React.FC = () => {
    const navigate = useNavigate();

    const nftCollection = [
        { id: 1, name: "Cool Cat #1", image: "https://via.placeholder.com/100" },
        { id: 2, name: "Cool Cat #1", image: "https://via.placeholder.com/100" },
        { id: 3, name: "Cool Cat #1", image: "https://via.placeholder.com/100" },
        { id: 4, name: "Cool Cat #1", image: "https://via.placeholder.com/100" },
      ];

    return (
        <div className="flex flex-col text-white mb-32  mx-6 md:min-w-[600px] min-h-screen">
            <div className="flex items-center w-full mt-3 mb-8 relative">
                {/* 뒤로가기 버튼 */}
                <FaChevronLeft
                    className="text-xl cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <h1 className="text-xl font-bold flex-grow text-center">My NFT Collection</h1>
                <div className="w-6"></div>
            </div>

            {/* NFT 컬렉션 */}
            <div className="w-full">
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
        </div>
    );
};

export default MyNfts;