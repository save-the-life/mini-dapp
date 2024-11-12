import React, { useState, useEffect } from 'react';
import { FaPen, FaPaw, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import registerPet from '@/entities/Pet/api/registPet';

const PetRegister: React.FC = () => {
    const [petImage, setPetImage] = useState<File | null>(null);
    const [petName, setPetName] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    // useMutation 훅 사용
    const { mutate: registerPetMutate, isPending } = useMutation({
    mutationFn: registerPet,
    onSuccess: () => {
        // 등록 성공 시 처리
        navigate('/select-pet');
    },
    onError: (error: any) => {
        // 에러 발생 시 사용자에게 알림
        alert('Failed to register pet. Please try again.');
    },
    });

    // 이미지 업로드
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const selectedFile = event.target.files[0];
        setPetImage(selectedFile);
        setImageUrl(URL.createObjectURL(selectedFile));
    }
    };

    // 컴포넌트가 언마운트되거나 이미지가 변경될 때 URL 해제
    useEffect(() => {
    return () => {
        if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
        }
    };
    }, [imageUrl]);

    // 등록 버튼 클릭
    const registerBtn = () => {
    if (!petName || !petImage) {
        alert('Please provide both pet name and image.');
        return; 
    }

    const petInfo = { name: petName, image: petImage };
    registerPetMutate(petInfo);
    };

    return (
    <div className="flex flex-col items-center text-white mx-6 md:mx-28 max-w-screen-xl relative min-h-screen pb-20">
        <div className="flex items-center w-full mt-4 relative">
            {/* 뒤로가기 버튼 */}
            <FaChevronLeft
                className="text-2xl cursor-pointer absolute left-0"
                onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl mx-auto font-semibold">Register Pet</h1>
        </div>

        {/* 반려동물 이미지 업로드 */}
        <div className="mt-10 relative">
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Pet"
                    className="w-full h-full object-cover"
                />
                ) : (
                <FaPaw className="text-6xl text-gray-600" />
                )}
            </div>
            <label htmlFor="pet-image-upload" className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
                <FaPen className="text-white" />
            </label>
            <input
                id="pet-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />
        </div>

        {/* 반려동물 이름 입력란 */}
        <div className="mt-16 w-11/12 max-w-md">
            <input
                type="text"
                placeholder="Please enter name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="w-full p-4 rounded-md mb-4 bg-gray-900 text-white border border-[#35383F] focus:outline-none"
            />
        </div>

        {/* 등록 버튼 - 페이지 하단에 고정 */}
        <div className="w-full max-w-md absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <button
                className="w-full py-4 rounded-full text-lg font-semibold"
                style={{
                backgroundColor: petName && petImage && !isPending ? '#0147E5' : '#555',
                cursor: petName && petImage && !isPending ? 'pointer' : 'not-allowed',
                }}
                onClick={registerBtn}
                disabled={!petName || !petImage || isPending}
            >
                {isPending ? 'Registering...' : 'Done'}
            </button>
        </div>
    </div>
    );
};

export default PetRegister;
