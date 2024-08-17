import { useState } from 'react';
import FullscreenButton from '../FullscreenButton';
import LogoutButton from '../LogoutButton';
import BackgroundChanger from './BackgroundChanger';
import { PiSelectionBackgroundDuotone } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import { MdSwitchAccount } from "react-icons/md";

const Settings = () => {
    const [isBgChangerOpen, setIsBgChangerOpen] = useState(false);
    const navigate = useNavigate();

    const handleBgChangeClick = () => {
        setIsBgChangerOpen(!isBgChangerOpen);
    };

    const handleCloseBgChanger = () => {
        setIsBgChangerOpen(false);
    };
    
    const { logout } = useLogout();
    const handleCreateNewAccount = async () => {
        try {
            await logout(); // Call the logout function
            navigate('/signup'); // Redirect to signup page
        } catch (error) {
            console.error('Failed to log out and redirect:', error);
        }
    };

    return (
        <div className="absolute top-[150px] left-[70px]  p-4 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg z-50 transition-transform duration-300 ease-in-out">
            <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-2">
                    <FullscreenButton className="text-white  cursor-pointer" onClick={() => console.log('Fullscreen button clicked')} />
                    <span>Fullscreen Mode</span>
                </div>
                <hr className="w-full border-t border-gray-500" />
                <div className="flex items-center gap-2">
                    <button className="text-white text-2xl cursor-pointer" onClick={handleBgChangeClick}>
                        <PiSelectionBackgroundDuotone />
                    </button>
                    <span>Change background</span>
                </div>
                <hr className="w-full border-t border-gray-500" />
                <div className="flex items-center gap-2">
                    <button className="text-white text-2xl cursor-pointer"  onClick={handleCreateNewAccount}>
                    <MdSwitchAccount />

                    </button>
                    <span>Create New Account</span>
                </div>
                <hr className="w-full border-t border-gray-500" />
                <div className="flex items-center gap-2">
                    <LogoutButton className="text-white text-2xl cursor-pointer" onClick={() => console.log('Logout button clicked')} />
                    <span>Logout</span>
                </div>
            </div>

            {/* Background Changer */}
            {isBgChangerOpen && (
                <div className="absolute top-[-180px] right-[-220px] max-md:top[-150px] max-md:right-[-120px] mt-12 mr-4 bg-gray-800 p-4 rounded-lg shadow-lg z-50">
                    <button
                        onClick={handleCloseBgChanger}
                        className="absolute top-2 right-2 text-white text-2xl"
                    >
                        <span>&times;</span> {/* Close icon */}
                    </button>
                    <BackgroundChanger />
                </div>
            )}
        </div>
    );
};

export default Settings;
