import React, {useState, useEffect, FC} from 'react';
import "../../../../../../public/SuccessModal.css"
import { useRouter } from 'next/navigation';

interface SuccessModalProps {
    text: string;
    bigText: string;
    isOpen: boolean;
    objectData: {
        [key: string]: string | object;
    };
    onClose: any;
}

const SuccessModal: FC<SuccessModalProps> = ({ text, bigText, isOpen, objectData, onClose }) => {
    const router = useRouter();

    // Use local state to manage modal visibility
    const [isVisible, setIsVisible] = useState<boolean>(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);
    
    const onCloseHandler = () => {
        setIsVisible(false);
        router.refresh();
        if (onClose) onClose();  // Adjusted line
    }


    const onRedirect = () => {
        router.push('/');
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full transition-opacity duration-300 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'}`}>
            <dialog open={isVisible} className="relative h-auto w-auto p-14 bg-white rounded-3xl shadow-lg transition-transform duration-300 transform ${isVisible ? 'scale-100' : 'scale-90'}">

                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>

                <h2 className={"text-3xl text-gray-800 font-bold m-3 flex justify-center"} >Udało się!</h2>

                <h3 className={'text-xl flex justify-center'}>{bigText}</h3>

                <p className={'justify-center m-auto flex font-extralight text-center w-10/12'}>{text}</p>

                <div className={'bg-gray-200 p-3 mt-6 mb-6 rounded-xl'}>
                    {Object.keys(objectData).map(key => {
                        if (typeof objectData[key] === 'object' || key === 'id') {
                            return null; // Skip rendering
                        }

                        const value = objectData[key] as string;
                        return (
                            <div key={key}>
                                <div className={'flex justify-between font-jetbrains-mono pb-1 pt-1'}>
                                    <div>{key.length > 11 ? key.substring(0, 11) + '...' : key}</div>
                                    <div>{value.length > 11 ? value.substring(0, 11) + '...' : value}</div>
                                </div>
                                <hr className={'border-gray-600'}/>
                            </div>
                        );
                    })}

                </div>


                <div className={'flex justify-between'} >
                    <button onClick={onCloseHandler} type="button" className="m-2 px-4 py-2 bg-blue-500 text-white rounded-md">OK</button>
                    <button onClick={onRedirect} type="button" className="m-2 px-4 py-2 bg-gray-300 rounded-md">wróć do menu</button>
                </div>
            </dialog>
        </div>
    );
};

export default SuccessModal;
