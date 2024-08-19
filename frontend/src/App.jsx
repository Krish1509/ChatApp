import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
// import MainBox from './components/AI_Chatbot/AI_bot'; // Import the MainBox component
import About from "./pages/about/about"
import ChatBot from './components/AI_ChatBot/ChatBot';

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className=' h flex flex-col justify-center '>
      {/* Include BackgroundChanger here */}
        <Routes>
        <Route path='/' element={authUser ? <Home />: <Navigate to={'/login'}/>} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> :<Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/chatbot" element={ <ChatBot />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;