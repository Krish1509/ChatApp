import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import About from "./pages/about/about";
import ChatBot from './components/AI_ChatBot/ChatBot';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import Loader from './components/Loder/Loader'; // Import the Loader component

function App() {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulating an API call or delay to demonstrate the loader
    const timer = setTimeout(() => {
      setLoading(false); // After 3 seconds, set loading to false
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // If the app is still loading, display the Loader component
  if (loading) {
    return <Loader />;
  }

  return (
    <div className='h flex flex-col justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/chatbot' element={<ChatBot />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
