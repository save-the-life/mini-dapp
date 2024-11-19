import Images from '@/shared/assets/images';
import { FaChevronLeft } from "react-icons/fa";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineCheck } from 'react-icons/hi';
import './WalletPage.css';

interface TruncateMiddleProps {
  text: string;
  maxLength: number;
  className?: string;
}

const TruncateMiddle: React.FC<TruncateMiddleProps> = ({
  text,
  maxLength,
  className,
}) => {
  const truncateMiddle = (str: string, maxLen: number): string => {
    if (str.length <= maxLen) return str;

    const charsToShow = maxLen - 3; // 3 characters for "..."
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);

    return (
      str.substr(0, frontChars) + '...' + str.substr(str.length - backChars)
    );
  };

  const truncatedText = truncateMiddle(text, maxLength);

  return <div className={`font-semibold ${className}`}>{truncatedText}</div>;
};

const WalletPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col text-white mb-32  mx-6 md:min-w-[600px] min-h-screen">
      <div className="flex items-center w-full mt-3 mb-8 relative">
        {/* 뒤로가기 버튼 */}
        <FaChevronLeft
            className="text-xl cursor-pointer"
            onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold flex-grow text-center">Wallet</h1>
        <div className="w-6"></div>
      </div>
      <div className=" mx-6 ">
        <h2 className=" text-lg font-semibold">Wallet Selection</h2>
        <p className="text-[#a3a3a3] text-sm">
          Please select a defualt wallet or add a new wallet.
        </p>
        <div className=" mt-12">
          <div className="h-[345px] space-y-2 overflow-y-hidden">
            <div className="flex flex-row rounded-2xl px-5 justify-between items-center h-16 border-2 bg-[#1f1e27] border-[#737373] box-border">
              <div className="flex flex-row items-center gap-3  ">
                <img src={Images.IcpLogo} className="w-6 h-6" alt="ICP logo" />
                <div className="flex flex-col text-sm">
                  {' '}
                  <p className="text-[#a3a3a3]">ICP</p>
                  <TruncateMiddle
                    text={'0xaec93f4a5casdasdasdasdasd8885'}
                    maxLength={20}
                  />
                </div>
              </div>
              <button className="flex flex-row gap-1 rounded-full bg-[#0147e5] h-7 w-16 items-center justify-center text-xs font-medium">
                Main <HiOutlineCheck className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3 font-medium">
            {' '}
            <button 
              className="flex flex-row rounded-3xl  h-14 border-2 border-[#142964] box-border  w-full items-center justify-center "
              onClick={()=> navigate('/wallet-list')}>
              Connect a new wallet
            </button>
            <div className="flex flex-row gap-3">
              <button className="bg-[#0147E5] rounded-3xl h-14 w-2/3">
                Set as default wallet
              </button>
              <button className="border-2 border-[#dd2726] text-[#dd2726] rounded-3xl h-14 w-1/3 box-border">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
