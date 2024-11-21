import Images from '@/shared/assets/images';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiX } from 'react-icons/hi';
import { FaChevronLeft } from "react-icons/fa";
import { AiFillQuestionCircle } from 'react-icons/ai';

// SelectedWallet 인터페이스 정의
interface SelectedWallet {
  wallet: string;
  img: string;
}

// 버튼 컴포넌트에서 사용할 props 인터페이스 정의
interface WalletCardProps {
  text: string;
  imgSrc: string;
}

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
    const [open, setOpen] = useState(false);
    const [walletInputOpen, setWalletInputOpen] = useState(false);
    const [tipOpen, setTipOpen] = useState(false);
    const [walletConnectSuccessOpen, setWalletConnectSuccessOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [selectedWallet, setSelectedWallet] = useState<SelectedWallet>({
        wallet: '', // 초기값을 null로 설정
        img: '',
    });

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setOpen(true);

        const buttonElement = event.currentTarget;

        // 버튼 내부의 텍스트와 이미지를 찾습니다.
        const textElement = buttonElement.querySelector('p');
        const imgElement = buttonElement.querySelector('img');

        if (textElement && imgElement) {
            const buttonText = textElement.textContent ?? ''; // 대체 값 설정
            const buttonImg = imgElement.getAttribute('src') ?? ''; // 이미지 경로 대체 값 설정

            // selectedWallet 상태를 업데이트합니다.
            setSelectedWallet({ wallet: buttonText, img: buttonImg });
        } else {
            console.log('Text or image element not found');
        }
    };

    const handleClose = () => {
     setOpen(false);
    };

    const handleWalletInputOpen = () => {
        handleClose();
        setWalletInputOpen(true);
    };

    const handleWalletInputClose = () => {
        setWalletInputOpen(false);
    };

    const handleTipOpen = () => {
        setTipOpen(true);
    };

    const handleTipClose = () => {
        setTipOpen(false);
    };

    const handleWalletConnectSuccessOpen = () => {
        handleWalletInputClose();
        setWalletConnectSuccessOpen(true);
    };

    const handleWalletConnectSuccessClose = () => {
        setWalletConnectSuccessOpen(false);
        navigate('/wallet')
    };

    const WalletCard: React.FC<WalletCardProps> = ({ text, imgSrc }) => {
        return (
            <button
                className="flex flex-row items-center gap-2 border-2 border-[#142964] h-16 rounded-3xl pl-5 mx-6 md:mx-28"
                onClick={handleOpen}
                >
            <img src={imgSrc} className="w-6 h-6" alt={`${text} logo`} />
            <p className="text-lg">{text}</p>
            </button>
        );
    };

    return (
        <div className="flex flex-col text-white mb-32  mx-6 min-h-screen">
            <div className="flex items-center w-full mt-3 mb-8 relative">
                {/* 뒤로가기 버튼 */}
                <FaChevronLeft
                    className="text-xl cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <h1 className="text-xl font-bold flex-grow text-center">Wallet</h1>
                <div className="w-5"></div>
            </div>

            <div className="flex flex-col gap-3">
                <WalletCard text="ICP" imgSrc={Images.IcpLogo} />
                <WalletCard text="BINANCE" imgSrc={Images.BinanceLogo} />
                <WalletCard text="OKX" imgSrc={Images.OkxLogo} />
                <WalletCard text="BYBIT" imgSrc={Images.BybitLogo} />
                <WalletCard text="HTX" imgSrc={Images.HtxLogo} />
                <WalletCard text="KUCOIN" imgSrc={Images.KucoinLogo} />
                <WalletCard text="MEXC" imgSrc={Images.MexcLogo} />
            </div>

            <AlertDialog open={open}>
                <AlertDialogContent className=" rounded-3xl bg-[#21212F] text-white border-none">
                    <AlertDialogHeader>
                        <AlertDialogTitle className=" text-center font-bold text-xl">
                            <div className="flex flex-row items-center justify-between">
                                <div> &nbsp;</div>
                                <p>{selectedWallet.wallet} Wallet</p>
                                <HiX className={'w-6 h-6 '} onClick={handleClose} />
                            </div>
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className=" flex flex-col items-center justify-center w-full h-full gap-10">
                        <div className="mt-20  w-40 h-40 bg-gradient-to-b from-[#2660f4] to-[#3937a3] rounded-[40px]  flex items-center justify-center">
                            <div className="w-[158px] h-[158px] logo-bg rounded-[40px] flex items-center justify-center">
                                <img src={selectedWallet.img} className=" w-16 h-16" />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className=" text-xl font-semibold">
                                Do you have a {selectedWallet.wallet} account?
                            </p>
                            <p className=" text-[#a3a3a3]">
                                To receive rewards,
                                <br />
                                you need to add your wallet address.
                            </p>
                        </div>
                        <div className="space-y-3 w-full">
                            <button
                                className=" w-full h-14 rounded-full bg-[#0147e5]"
                                onClick={handleWalletInputOpen}
                                >
                                Yes, I have an account
                            </button>
                            <button className=" w-full h-14 rounded-full bg-[#0D1226] border border-[#142964]">
                                Create Account
                            </button>
                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={walletInputOpen}>
                <AlertDialogContent className=" rounded-3xl bg-[#21212F] text-white border-none">
                <AlertDialogHeader>
                        <AlertDialogTitle className=" text-center font-bold text-xl">
                            <div className="flex flex-row items-center justify-between">
                                <div> &nbsp;</div>
                                <p>{selectedWallet.wallet} Wallet</p>
                                <HiX className={'w-6 h-6 '} onClick={handleWalletInputClose} />
                            </div>
                        </AlertDialogTitle>
                </AlertDialogHeader>
                <div className=" flex flex-col items-center justify-center w-full h-full gap-10 pt-20">
                    <div className="text-center space-y-2">
                        <p className=" text-xl font-semibold">
                            Balance {selectedWallet.wallet}
                        </p>
                        <p className=" text-[#a3a3a3]">
                            To receive tokens,
                            <br />
                            you need to add your wallet address.
                        </p>
                    </div>
                    <div>
                        <input
                            placeholder="Deposit Address"
                            className=" w-full h-14 px-5 rounded-2xl bg-[#21212f] border-2 border-[#142964]"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row w-full gap-3">
                        <button
                            className="flex items-center justify-center h-14 min-w-14 border-2 border-[#142964] rounded-2xl"
                            onClick={handleTipOpen}
                        >
                            {' '}
                            <AiFillQuestionCircle className="w-6 h-6" />
                        </button>
                        <button
                            className={` w-full h-14 rounded-full bg-[#0147e5] ${
                            address === '' ? 'opacity-40' : ''
                            }`}
                            disabled={address === ''}
                            onClick={handleWalletConnectSuccessOpen}
                        >
                            Next
                        </button>
                    </div>
                </div>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={tipOpen}>
                <AlertDialogContent className=" rounded-3xl bg-[#21212F] text-white border-none">
                    <AlertDialogHeader>
                        <AlertDialogTitle className=" text-center font-bold text-xl">
                            <div className="flex flex-row items-center justify-between">
                                <div> &nbsp;</div>
                                <p>Tip</p>
                                <HiX className={'w-6 h-6 '} onClick={handleTipClose} />
                            </div>
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className=" flex flex-col items-center justify-center w-full h-full gap-3 pt-8">
                        <div className="space-y-1">
                            <div className="flex flex-row items-start text-xl font-semibold ">
                                <p> 1. &nbsp;</p>
                                <p>Find your wallet in the exchange application.</p>
                            </div>
                            <p className="text-[#a3a3a3] pl-4">
                                Open the exchange form and check the deposit wallet.
                            </p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex flex-row items-start text-xl font-semibold ">
                                <p> 2.&nbsp;</p>
                                <p>Copy your wallet address.</p>
                            </div>
                            <p className="text-[#a3a3a3] pl-4">
                                Copy your EVM ERC-20 wallet address (ex: ETH ERC-20)
                            </p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex flex-row items-start text-xl font-semibold ">
                                <p> 3.&nbsp;</p>
                                <p>Find your wallet in the exchange application.</p>
                            </div>
                            <p className="text-[#a3a3a3] pl-4">
                                To receive tokens, please enter your USDT ERC-20 wallet address.
                            </p>
                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={walletConnectSuccessOpen}>
                <AlertDialogContent className=" rounded-3xl bg-[#21212F] text-white border-none">
                    <AlertDialogHeader>
                        <AlertDialogTitle className=" text-center font-bold text-xl">
                            <div className="flex flex-row items-center justify-between">
                                <div> &nbsp;</div>
                                <p>ICP Wallet</p>
                                <HiX
                                className={'w-6 h-6 '}
                                onClick={handleWalletConnectSuccessClose}
                                />
                            </div>
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className=" flex flex-col items-center justify-center w-full h-full gap-3 pt-8">
                        <p className=" text-xl font-semibold">Wallet Connected!</p>
                        <p className="text-[#a3a3a3] text-center">
                            My wallet(
                            <span className="text-white">
                                <TruncateMiddle
                                text={address}
                                maxLength={20}
                                className="inline font-medium"
                                />
                            </span>
                            ) has been successfully connected.
                        </p>
                        <button
                            className="bg-[#0147e5] rounded-3xl  h-14 w-full font-medium mt-[200px]"
                            onClick={handleWalletConnectSuccessClose}
                            >
                            Done
                        </button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <div className=" mx-6 ">
                <p className="text-sm text-[#0D1226]">
                Please select a defualt wallet or add a new wallet.
                </p>
            </div>
        </div>
    );
};

export default WalletPage;
