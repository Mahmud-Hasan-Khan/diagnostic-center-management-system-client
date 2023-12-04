import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";


const MainLayout = () => {
    return (
        <div className='min-h-screen flex flex-col font-poppins'>
            <Navbar />
            <div className='flex-grow'>
                <Outlet></Outlet>
            </div>
            <Footer className="mt-auto"></Footer>
        </div>
    );
};

export default MainLayout;