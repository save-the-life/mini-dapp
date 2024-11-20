import './AIMenu.css';
import Images from '@/shared/assets/images';
import useMainPageStore from '@/shared/store/useMainPageStore';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

interface AIMenuProps {
  title: string;
  alt: string;
  image: string;
  onClick: () => void;
  className: string;
}

const AIMenus: React.FC<AIMenuProps> = ({
  title,
  alt,
  image,
  className,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col rounded-3xl aspect-square items-center justify-center gap-3 ${
        className && className
      }`}
      onClick={onClick}
      >
      <img src={image} alt={alt} className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm md:text-xl lg:text-2xl font-semibold text-center">{title}</p>
      </div>
    </div>
  );
};


const AIMenu: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedMenu = useMainPageStore((state) => state.setSelectedMenu);
  const [showModal, setShowModal] = useState(true);


  // 각 메뉴 클릭 시 전역 상태 설정 후 반려동물 선택 페이지로 이동
  const handleMenuClick = (menu: 'x-ray' | 'ai-analysis' | 'records') => {
    // x-ray 또는 ai-analysis 선택 시 전역 상태에 저장 후 반려동물 선택 페이지로 이동
    setSelectedMenu(menu);
    navigate('/select-pet');
  };
  

  return (
    <div className="flex flex-col text-white mx-6 md:mx-28 min-h-screen">
      {/* <TopTitle title="Pet Health Management" /> */}
      <div 
        className="flex items-center w-full mt-8 relative"
        onClick={()=> navigate('/my-point')}>
        <img
          src={Images.slToken}
          alt="Star"
          className="w-6 h-6 mr-2"
          />
        <p className="text-lg font-semibold mr-2">50SL</p>
        <FaChevronRight className="text-lg cursor-pointer" />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <AIMenus
          title="AI-based examination for pets"
          image={Images.HomeTooth}
          alt="HomeTooth"
          className="follow-on-x-mission-card"
          onClick={() => handleMenuClick('ai-analysis')}
        />
        <AIMenus
          title="AI-based dental X-ray analysis"
          image={Images.HomeXray}
          alt="HomeXray"
          className="join-telegram-mission-card"
          onClick={() => handleMenuClick('x-ray')}
        />
        <AIMenus
          title="Viewing Records"
          image={Images.HomeReport}
          alt="HomeReport"
          className="join-the-sl-discord-mission-card"
          onClick={() => handleMenuClick('records')}
        />
        </div>
      <br /> <br /> <br /> <br />
      <br />


      {/* SL토큰 소요 알림 모달창 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white text-black p-6 rounded-lg text-center">
                <p>10SL tokens are consumed to run AI diagnostics.</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => setShowModal(false)}
                    >
                    OK
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default AIMenu;
