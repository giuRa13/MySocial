import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"

const HomePage = () => {

  const currentUser = useRecoilValue(userAtom)

  return (

    <Link to={`/${currentUser.username}`}>
        <div className="w-full flex justify-center">
            <button className="mx-auto rounded bg-greenM1 py-4 px-8 font-bold text-grayM hover:bg-opacity-70"> 
                Go to Profile Page
            </button>
        </div>
    </Link>

  )
}

export default HomePage