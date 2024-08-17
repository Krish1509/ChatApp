import NavSidebar from '../../components/NavigatSidebar/NavSidebar';
import AboutInfo from "./aboutInfo.jsx";

const About = () => {
    return (
        <div className='flex h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <div className='w-[73px] '>
                <NavSidebar />
            </div>
            <div className='flex-1 flex justify-center items-center'>
                <AboutInfo />
            </div>
        </div>
    );
}

export default About;
