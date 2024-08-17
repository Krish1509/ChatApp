import { BiLogOut } from 'react-icons/bi';
import React from 'react';
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
    const { loading, logout } = useLogout();

    return (
        <div className='mt-auto cursor-pounter'>
            {!loading ? (
                <BiLogOut 
                    className="w-6 h-6 text-white cursor-pointer" 
                    onClick={logout} 
                />
            ) : (
                <span className="loading loading-spinner"></span>
            )}
        </div>
    );
};

export default LogoutButton;
