import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; 
import Login from "./pages/Login.jsx";
import { LeftSideBar, Header } from "./components/index.js";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); 

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-row">
          <div>
            <LeftSideBar />
          </div>
          <div className="w-full">
            <Header />
            <Outlet />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
