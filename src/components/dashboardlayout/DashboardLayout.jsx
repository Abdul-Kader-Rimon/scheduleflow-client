import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;

  return (
    <div className="min-h-screen flex bg-gray-100">

      
      <div className="w-64 bg-white shadow-md p-5">

<NavLink to="/">
    <h2 className="text-xl font-bold mb-6">
          Dashboard
        </h2>
</NavLink>
        

     
        <nav className="flex flex-col gap-3">

          <NavLink to="/dashboard" className="hover:text-blue-500">
            Home
          </NavLink>

          
          {role === "student" && (
            <>
              <NavLink to="/dashboard/available-slots" className="hover:text-blue-500">
                Available Slots
              </NavLink>

              <NavLink to="/dashboard/my-bookings" className="hover:text-blue-500">
                My Bookings
              </NavLink>
            </>
          )}

           
          {role === "teacher" && (
            <>
              <NavLink to="/dashboard/create-slot" className="hover:text-blue-500">
                Create Slot
              </NavLink>

              <NavLink to="/dashboard/my-slots" className="hover:text-blue-500">
                My Slots
              </NavLink>
            </>
          )}

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;