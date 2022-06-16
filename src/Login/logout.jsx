import {useNavigate} from "react-router-dom";
import facade from "./LoginFacade";

const logout = () => {

    const navigate = useNavigate()

    const logout = () => {
        facade.logout()
        navigate("/")
    }

    const goBack = () => {
        navigate("/")
    }
    return(
        <>
            <div className="flex w-full justify-center mt-80">
                <div>
                    <button onClick={logout} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">Logout</button>
                    <button onClick={goBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go Back</button>
                </div>
            </div>

        </>
    )
}

export default logout