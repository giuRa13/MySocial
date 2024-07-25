import { useState } from "react";
import moonSVG from "./assets/moon.svg";
import sunSVG from "./assets/sun.svg";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  const [dark, setDark] = useState(true);

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
      <button className={`absolute top-5 right-10 w-10 h-5 md:w-12 md:h-6 rounded-2xl flex items-center
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
        <ToastContainer theme="colored" position="top-center"/>
          <Routes>
            <Route path="/:username" element={<UserPage/>}/>
            <Route path="/:username/post/:pId" element={<PostPage/>}/>
          </Routes>
      </section>

    </main>
    </>
  )
}

export default App
