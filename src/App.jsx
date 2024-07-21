import { useState } from "react";
import moonSVG from "./assets/moon.svg";
import sunSVG from "./assets/sun.svg";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";


function App() {

  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
}

  const renderImg = (dark) => {
    return  dark ?  <img src={moonSVG} alt='moonIcon' className='w-[1.5] h-[1.5] '/> 
    :  <img src={sunSVG} alt='sunIcon' className='w-[1.5] h-[1.5] '/>
}

  return (
    <>
    <main className="w-screen h-screen flex flex-col items-center bg-whiteZinc dark:bg-blackM text-greenM1" >
      <button className={`absolute top-5 right-10 w-10 h-5 md:w-12 md:h-6 rounded-2xl flex items-center
      transition duration-300 focus:outline-none shadow-lg ${dark ? "bg-grayM" : "bg-lightgrey"}`}
      onClick={() =>darkModeHandler()}>     
                
        <div id="switch-toggle"
        className={`w-6 h-6 md:w-7 md:h-7 relative rounded-full transition duration-500 transform  
        ${dark ? "bg-greenM1 translate-x-full p-1" : "bg-greenM2 -translate-x-2 p-1"}`}>
          {renderImg(dark)}
        </div>
      </button>

      <section className="w-[40%]">
        <Header/>
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
          {/*<button className="bg-greenM1 rounded-lg py-3 px-8 m-2 hover:opacity-70">Ji</button>
          <button className="bg-greenM2 rounded-lg py-3 px-8 m-2 hover:opacity-70">Hi</button>
          <button className="bg-greenM3 rounded-lg py-3 px-8 m-2 hover:opacity-70">HI</button>
          <button className="bg-greenM4 rounded-lg py-3 px-8 m-2 hover:opacity-70">HA</button>
          <button className="bg-blackM rounded-lg py-3 px-8 m-2 hover:opacity-70">hhh</button>
          <button className="bg-grayM rounded-lg py-3 px-8 m-2 hover:opacity-70">H</button>*/}