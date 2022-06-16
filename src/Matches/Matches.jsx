import {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import facade from "../Login/LoginFacade";

const matches = () => {
    const location = useLocation()
    const [matches, setMatches] = useState([])
    const getMatches = async () => {
        const res = await fetch(location.state)
        const data = await res.json();
        setMatches(data);
    }

    const navigate = useNavigate()

    const deleteMatch = (event, key) => {
        event.preventDefault()
        facade.deleteMatch(key)
            .then(res => navigate("/matches"))
    }

    useEffect(() => {
        getMatches()
    },[])


    return(
        <>

            <div className="w-full flex justify-center text-center">
                <div>
                    <h1 className="text-lg text-white">All Matches</h1>
                    <div className="relative mt-10   overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Id</th>
                                    <th scope="col" className="px-6 py-3">opponentTeam</th>
                                    <th scope="col" className="px-6 py-3">Judge</th>
                                    <th scope="col" className="px-6 py-3">Type</th>
                                    <th scope="col" className="px-6 py-3">inDoors</th>
                                    <th scope="col" className="px-6 py-3">Location</th>
                                    {localStorage.getItem("userType") === "admin" ? (
                                        <th scope="col" className="px-6 py-3"></th>
                                    ) : ("")}
                                </tr>
                            </thead>
                            <tbody>
                            {matches.map(item => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                    <td className="px-6 py-4">{item.id}</td>
                                    <td className="px-6 py-4">{item.opponentTeam}</td>
                                    <td className="px-6 py-4">{item.judge}</td>
                                    <td className="px-6 py-4">{item.type}</td>
                                    <td className="px-6 py-4">{item.inDoors ? (<p>yes</p>) : (<p>no</p>)}</td>
                                    <td className="px-6 py-4">{item.locationId}</td>
                                    {localStorage.getItem("userType") === "admin" ? (
                                        <td onClick={event => deleteMatch(event,item.id)} className="px-6 py-4"><button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">Delete</button></td>
                                    ): ("")}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        {localStorage.getItem("userType") === "admin" ? (
                            <button className="bg-blue-500 mt-10 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                <Link to={"/createMatch"}>Edit</Link>
                            </button>) : (<p></p>)}
                    </div>

                </div>
            </div>
        </>

    )
}
export default matches