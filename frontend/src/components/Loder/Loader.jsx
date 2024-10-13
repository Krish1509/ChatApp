const Loader = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          {/* Animated Title with 3D Effect */}
          <h1 className="text-gray-300 text-5xl font-extrabold mb-6 animate-bounce md:text-6xl lg:text-7xl shadow-lg">
            Welcome to ChatApp
          </h1>
  
          {/* 3D Loader */}
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 border-8 border-t-transparent border-b-transparent border-gray-700 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full shadow-lg animate-pulse"></div>
            
            {/* Inner circle to create a 3D effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-900 border-4 border-gray-600 rounded-full shadow-inner"></div>
            </div>
          </div>
  
          {/* Loading Message with 3D Shadow */}
          <p className="text-gray-400 text-lg md:text-xl lg:text-2xl mt-4 animate-pulse ">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  };
  
  export default Loader;
  