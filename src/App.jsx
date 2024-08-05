import { useState } from "react";
import moonSVG from "./assets/moon.svg";
import sunSVG from "./assets/sun.svg";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";


function App() {

  const [dark, setDark] = useState(true);
  const user = useRecoilValue(userAtom);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
}

  const renderImg = (dark) => {
    return  dark ?  <img src={moonSVG} alt='moonIcon' className='w-[2] h-[2] '/> 
    :  <img src={sunSVG} alt='sunIcon' className='w-[2] h-[2] '/>
}

  return (
    <>
    <main className="w-full h-full flex flex-col items-center dark:bg-blackM bg-whiteZinc text-greenM1" >
      <button className={`absolute top-7 right-60 w-10 h-5 md:w-12 md:h-6 rounded-2xl flex items-center
      transition duration-300 focus:outline-none shadow-lg ${dark ? "bg-grayM" : "bg-lightgrey"}`}
      onClick={() =>darkModeHandler()}>     
                
        <div id="switch-toggle"
        className={`w-7 h-7 md:w-8 md:h-8 p-1.5 relative rounded-full transition duration-500 transform  
        ${dark ? "bg-greenM1 translate-x-6" : "bg-greenM2 -translate-x-2"}`}>
          {renderImg(dark)}
        </div>
      </button>

      <section className="w-[50%] h-auto section">
        <Header/>
        <ToastContainer 
          position="top-left"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
          <Routes>
            <Route path="/" element={user ? <HomePage/> : <Navigate to="/auth"/>}/>
            <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to="/"/>}/>
            <Route path="/update" element={user ? <UpdateProfilePage/> : <Navigate to="/auth"/>}/>

            <Route path="/:username" element={<UserPage/>}/>
            <Route path="/:username/post/:pId" element={<PostPage/>}/>
          </Routes>

          {user && <LogoutButton/>}
      </section>

    </main>
    </>
  )
}

export default App
