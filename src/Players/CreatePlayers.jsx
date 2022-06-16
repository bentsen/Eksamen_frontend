import {useState} from "react";
import facade from "../Login/LoginFacade";
import {useNavigate} from "react-router-dom";

const createPlayers = () => {
    const[match, setMatch] = useState({
        name: "",
        phone: "",
        email: "",
        status: "",
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        facade.createPlayer(match)
            .then(res => navigate("/players"))
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMatch({...match, [name]: value})
    }

    return(
        <>
            <div className="text-center ">
                <div className="overflow-hidden">
                    <h1 className="text-lg text-white">Create Player</h1>
                    <form className="grid grid-cols-1 gap-4 p-9 rounded-xl shadow-xl bg-gray-50 max-w-sm mx-auto bg-gray-700">
                        <label className="text-white" htmlFor="name">Name</label>
                        <input className="bg-gray-800 h-10 rounded indent-1" type="text" name="name" onChange={handleChange} placeholder={"Name"}/>
                        <label className="text-white" htmlFor="phone">Phone</label>
                        <input className="bg-gray-800 h-10 rounded indent-1" type="number" name="phone" onChange={handleChange} placeholder={"Phone"}/>
                        <label className="text-white" htmlFor="email">Email</label>
                        <input className="bg-gray-800 h-10 rounded indent-1" type="email" name="email" onChange={handleChange} placeholder={"Email"}/>
                        <label className="text-white" htmlFor="inDoors">Active</label>
                        <select className="bg-gray-800 h-10 rounded text-gray-400" name="status" onChange={handleChange} id="status">
                            <option value="active">Yes</option>
                            <option value="passive">No</option>
                        </select>
                    </form>
                    <button className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default createPlayers