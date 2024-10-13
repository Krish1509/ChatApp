import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GenderCheckbox from './GenderCheckbox';
import useSignUp from '../../hooks/useSignup';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { loading, signup } = useSignUp();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <div className='flex flex-col backdrop-blur-[10px] items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
            <div className="p-6 shadow-md w-full max-w-md bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
                <h1 className='text-3xl font-semibold text-center text-gray-300 mb-4'>
                    Sign Up <span className='text-blue-500'>ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className='block text-base label-text mb-2 text-gray-100'>
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Full Name'
                            className='w-full h-10 px-3 py-2 bg-[#1D232A] text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className='block text-base label-text mb-2 text-gray-100'>
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Username'
                            className='w-full h-10 px-3 py-2 bg-[#1D232A] text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className='block text-base label-text mb-2 text-gray-100'>
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter Password'
                            className='w-full h-10 px-3 py-2 pr-10 bg-[#1D232A] text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute inset-y-0 right-3 flex items-center mt-8'
                        >
                            {showPassword ? <FaEyeSlash className='text-gray-400' /> : <FaEye className='text-gray-400' />}
                        </button>
                    </div>

                    <div className="mb-4 relative">
                        <label className='block text-base label-text mb-2 text-gray-100'>
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Enter Confirm Password'
                            className='w-full h-10 px-3 py-2 pr-10 bg-[#1D232A] text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className='absolute inset-y-0 right-3 flex items-center mt-8'
                        >
                            {showConfirmPassword ? <FaEyeSlash className='text-gray-400' /> : <FaEye className='text-gray-400' />}
                        </button>
                    </div>

                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <Link to='/login' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-200">
                        Already have an account?
                    </Link>

                    <div className="mt-4">
                        <button className='btn btn-block btn-sm mt-2 text-gray-300 border-[#1D232A] hover:border-blue-600 bg-blue-600 rounded-md' type="submit" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
