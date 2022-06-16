import {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import facade from "../Login/LoginFacade";

const location = () => {
    const [location, setLocation] = useState([])
    const getLocation = async () => {
        const res = await fetch("http://localhost:8080/sport_war_exploded/api/location")
        const data = await res.json();
        setLocation(data);
    }

    const navigate = useNavigate()

    const getMatchByLocation = (event, key) => {
        navigate("/matches",{state:"http://localhost:8080/sport_war_exploded/api/match/location/" + key});
    }

    const deleteLocation = (event, key) => {
        event.preventDefault()
        facade.deleteLocation(key)
            .then(res => navigate("/locations"))
    }

    useEffect(() => {
        getLocation()
    },[])


    return(
        <>

            <div className="w-full flex justify-center text-center">
                <div>
                    <h1 className="text-lg text-white">All Locations</h1>
                    <div className="relative mt-10   overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Id</th>
                                <th scope="col" className="px-6 py-3">City</th>
                                <th scope="col" className="px-6 py-3">Condition</th>
                                <th scope="col" className="px-6 py-3">Matches</th>
                                {localStorage.getItem("userType") === "admin" ? (
                                    <th scope="col" className="px-6 py-3"></th>
                                ) : ("")}
                            </tr>
                            </thead>
                            <tbody>
                            {location.map(item => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                    <td className="px-6 py-4">{item.id}</td>
                                    <td className="px-6 py-4">{item.city}</td>
                                    <td className="px-6 py-4">{item.condition}</td>
                                    <td onClick={event => getMatchByLocation(event,item.id)} className="px-6 py-4"><p className="underline cursor-pointer">Matches</p></td>
                                    {localStorage.getItem("userType") === "admin" ? (
                                        <td onClick={event => deleteLocation(event,item.id)} className="px-6 py-4"><button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">Delete</button></td>
                                    ): ("")}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-10">

                    </div>
                </div>
            </div>
        </>

    )
}
export default location