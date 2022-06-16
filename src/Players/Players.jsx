import {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import facade from "../Login/LoginFacade";


const players = () => {
    const [players, setPlayers] = useState([])
    const getPlayers = async () => {
        const res = await fetch("http://localhost:8080/sport_war_exploded/api/player")
        const data = await res.json();
        setPlayers(data);
    }

    const navigate = useNavigate()

    const getMatchByPlayer = (event, key) => {
        navigate("/matches",{state:"http://localhost:8080/sport_war_exploded/api/match/player/" + key});
    }

    const deletePlayer = (event, key) => {
        event.preventDefault()
        facade.deletePlayer(key)
            .then(res => navigate("/players"))
    }

    useEffect(() => {
        getPlayers()
    },[])
    return(
        <>
            <div className="w-full flex justify-center text-center">
                <div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Id</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Matches</th>
                                {localStorage.getItem("userType") === "admin" ? (
                                    <th scope="col" className="px-6 py-3"></th>
                                ) : ("")}
                            </tr>
                            </thead>
                            <tbody>
                            {players.map((item) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                    <td className="px-6 py-4">{item.id}</td>
                                    <td className="px-6 py-4">{item.name}</td>
                                    <td className="px-6 py-4">{item.phone}</td>
                                    <td className="px-6 py-4">{item.email}</td>
                                    <td className="px-6 py-4">{item.status}</td>
                                    <td onClick={event => getMatchByPlayer(event,item.id)} className="px-6 py-4"><p className="underline cursor-pointer">Matches</p></td>
                                    {localStorage.getItem("userType") === "admin" ? (
                                        <td onClick={event => deletePlayer(event,item.id)} className="px-6 py-4"><button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">Delete</button></td>
                                    ): ("")}
                                    </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        {localStorage.getItem("userType") === "admin" ? (
                            <button className="bg-blue-500 mt-10 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                <Link to={"/createPlayer"}>Edit</Link>
                            </button>) : (<p></p>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default players
