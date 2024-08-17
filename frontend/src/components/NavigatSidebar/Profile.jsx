import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext';

const Profile = () => {
    const { authUser } = useAuthContext();
    const { onlineUsers } = useSocketContext();
    const profilePic = authUser?.profilePic || 'defaultProfilePic.png';
    const fullName = authUser?.fullName || 'Name';
    const userName = authUser?.username || 'Username';
    const gender = authUser?.gender || 'Gender';
    const isOnline = authUser && onlineUsers.includes(authUser._id);

    return (
        <div className="relative flex flex-col items-center p-6 bg-gradient-to-b from-[#2C3E50] to-[#4A6274] rounded-lg max-w-sm mx-auto border-[3px] border-gray-600 shadow-2xl transform transition-transform hover:scale-105">
            
            {/* Profile Picture with Online Indicator */}
            <div className="relative">
                <img src={profilePic} alt="Profile" className="w-24 h-24 border-[3px] border-gray-700 rounded-full mb-2 shadow-lg" />
                {isOnline && <span className="absolute top-1 right-1 w-5 h-5 bg-green-500 border-2 border-gray-700 rounded-full"></span>}
            </div>

            {/* User Status */}
            <p className={`text-lg font-semibold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>{isOnline ? 'Online' : 'Offline'}</p>

            {/* User Info */}
            <h2 className="text-2xl font-bold text-white mb-2">@{userName}</h2>
            <div className="text-start w-full px-2">
                <p className="text-lg font-semibold text-white break-words"><span className="text-gray-300">Full Name:</span> {fullName}</p>
                <p className="text-lg font-semibold text-white break-words"><span className="text-gray-300">Gender:</span> {gender}</p>
            </div>
        </div>
    );
};

export default Profile;
