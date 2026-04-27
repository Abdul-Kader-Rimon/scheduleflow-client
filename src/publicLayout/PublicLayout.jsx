import { Outlet } from 'react-router-dom';
 

const RootLayout = () => {
   
    return (
      <div>
        <div className="  mx-auto flex flex-col min-h-screen">
          
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
       
      </div>
    );
};

export default RootLayout;
