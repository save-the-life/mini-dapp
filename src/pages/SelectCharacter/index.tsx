import React from 'react';
import SelectCharacter from './SelectCharacter';
import chooseCharacter from '@/entities/User/api/chooseCharacter';
import { useNavigate } from 'react-router-dom';

const SelectCharacterPage: React.FC = () => {
  const [selectedPet, setSelectedPet] = React.useState<'DOG' | 'CAT'>('DOG');
  
  const navigate = useNavigate();

  const handleCharacterSelect = async () => {
    try{
      const response = await chooseCharacter(selectedPet);
      if(response){
        // 정상 반환이면 로컬스토리지에 엑세스 토큰 저장 후 메인 페이지로 이동
        navigate('/dice-event')
      }else{
        console.log("로그인 에러 발생");
      }
    }catch(error: any){
      
    }
  };

  return (
    <div className="relative">
      <SelectCharacter selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
      <div className="bottom-10 absolute flex w-full self-center">
          <button
            className={`h-14 bg-[#0147e5] rounded-full w-full mx-6 ${
              selectedPet ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!selectedPet}
            onClick={handleCharacterSelect}
            >
            Continue
          </button>
        </div>
    </div>
  );
};

export default SelectCharacterPage;
