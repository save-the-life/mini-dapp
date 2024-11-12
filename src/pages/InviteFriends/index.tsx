// InviteFriends.tsx
import React, { useState } from 'react';
import { TopTitle } from '@/shared/components/ui';
import './InviteFriends.css';
import Images from '@/shared/assets/images';
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { BiCopy } from 'react-icons/bi';

const InviteFriends: React.FC = () => {
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState<string>('');

  const referralLink = 'https://pwa-slapp-13cs.vercel.app/telegramideded';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopySuccess('Copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 2000); // 2초 후에 알림 메시지 제거
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div className="flex flex-col mx-6 mb-44 text-white items-center md:mx-28 min-h-screen">
      <div className="flex items-center w-full mt-4 relative">
          {/* 뒤로가기 버튼 */}
          <FaChevronLeft
            className="text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-semibold flex-1 text-center">Invite Friend</h1>
        </div>
      <p>Referral Code</p>
      <button
        className="flex flex-row gap-2 items-center border border-white rounded-full w-56 md:w-80 h-16 justify-center mt-2 px-4"
        onClick={copyToClipboard}
      >
        <p className="truncate">{referralLink}</p>
        <BiCopy className="min-w-5 min-h-5" />
      </button>
      {copySuccess && (
        <p className="text-sm text-green-500 mt-2">{copySuccess}</p>
      )}
      <div className="invite-reward-box w-[342px] md:w-[500px] h-72 rounded-3xl flex flex-col items-center justify-center mt-9 gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col items-center gap-2 justify-center">
            <img src={Images.Dices} alt="dice" className="h-11" />
            <p className="font-medium text-sm">5 Dice</p>
          </div>
          <p className="text-[40px]">+</p>
          <div className="flex flex-col items-center gap-2 justify-center">
            <img src={Images.Star} alt="star" className="h-11" />
            <p className="font-medium text-sm">3000 P</p>
          </div>
        </div>
        <p className="text-sm ">
          You can receive an{' '}
          <span className="text-2xl font-semibold">additional 10%</span> <br />
          of your invited friend's reward.
        </p>
        <button className="h-14 w-[302px] rounded-full bg-[#21212f]">
          Invite Friends and Get Reward
        </button>
      </div>
      <div className="flex flex-col mt-8 w-full gap-3">
        <div className="flex flex-row justify-between items-center mb-[6px]">
          <p className="text-lg font-medium">Invited Friends</p>
          <div className="flex items-center justify-center text-sm font-medium w-[72px] h-8 rounded-full bg-[#21212f]">
            total : 3
          </div>
        </div>
        <div className="bg-white rounded-3xl flex flex-row items-center justify-start gap-4 h-16 text-[#171717] font-medium px-5">
          <p className="text-[#737373]">1</p>
          <p>Olivia Smith</p>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
