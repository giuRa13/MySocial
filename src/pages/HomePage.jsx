import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <Link to={"/username"}>
        <div className="w-full flex justify-center">
            <button className="mx-auto rounded bg-greenM1 py-4 px-8 font-semibold text-grayM hover:bg-opacity-70"> 
                Go to Profile Page
            </button>
        </div>
    </Link>
  )
}

export default HomePage