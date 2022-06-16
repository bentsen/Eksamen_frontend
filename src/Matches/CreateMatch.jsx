import {useEffect, useState} from "react";
import facade from "../Login/LoginFacade";
import {useNavigate} from "react-router-dom";

const createMatch = () => {
    const[match, setMatch] = useState({
        opponentTeam: "",
        judge: "",
        type: "",
        inDoors: "",
        locationId: ""
    })

    const[location, setLocatin] = useState([])
    const getLocation = async () => {
        const res = await fetch("http://localhost:8080/sport_war_exploded/api/location")
        const data = await res.json();
        setLocatin(data);
    }
    useEffect(() => {
        getLocation()
    },[])

    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMatch({...match, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        facade.createMatch(match)
            .then(res => navigate("/matches"))
    }

    return (
        <>
            <div className="text-center ">
                <div className="overflow-hidden">
                    <h1 className="text-lg text-white">Create Match</h1>
                    <form className="grid grid-cols-1 gap-4 p-9 rounded-xl shadow-xl bg-gray-50 max-w-sm mx-auto bg-gray-700">
                        <label className="text-white" htmlFor="opponentTeam">Opponents</label>
                        <input className="bg-gray-800 h-10 rounded indent-1" type="text" name="opponentTeam" onChange={handleChange} placeholder={"Oponen..."}/>
                        <label className="text-white" htmlFor="judge">Judge</label>
                        <input className="bg-gray-800 h-10 rounded indent-1" type="text" name="judge" onChange={handleChange} placeholder={"Judge"}/>
                        <label className="text-white" htmlFor="type">Type</label>
                        <input className="bg-gray-800 h-10 rounded indent-1" type="text" name="type" onChange={handleChange} placeholder={"Type"}/>
                        <label className="text-white" htmlFor="inDoors">inDoors</label>
                        <select className="bg-gray-800 h-10 rounded text-gray-400" name="inDoors" onChange={handleChange} id="inDoors">
                            <option value="true">Yes</option >
                            <option value="false">No</option>
                        </select>
                        <label className="text-white" htmlFor="locationId">Location</label>
                        <select className="bg-gray-800 h-10 rounded text-gray-400" name="locationId" id="locationId">
                            {location.map(items => (
                                <option key={items.id} value={items.id}>
                                    {items.city}
                                </option>
                            ))}
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

export default createMatch