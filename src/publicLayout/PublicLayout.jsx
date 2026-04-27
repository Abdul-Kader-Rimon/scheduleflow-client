import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/footer/Footer';
 

const RootLayout = () => {
   
    return (
      <div>
        <div className="  mx-auto flex flex-col min-h-screen">
          <Navbar/>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
        <Footer/>
      </div>
    );
};

export default RootLayout;
